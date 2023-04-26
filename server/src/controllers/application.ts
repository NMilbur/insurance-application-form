import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { format } from "date-fns";
import { getFormattedDOB, validateApplicationData } from "../utils/helpers";

const prisma = new PrismaClient();

export const createApplication = async (req: Request, res: Response) => {
  let dateOfBirthFormatted: Date | null = null;

  const { dateOfBirth, ...restRequest } = req.body;

  if (dateOfBirth) {
    dateOfBirthFormatted = getFormattedDOB(dateOfBirth);
  }

  const [isValid, messages] = validateApplicationData(
    { ...restRequest, dateOfBirth: dateOfBirthFormatted },
    true
  );

  if (!isValid) {
    res.status(422).send(
      JSON.stringify({
        status: "MISSING_VALUES",
        messages,
      })
    );
  } else {
    const { vehicles, zipCode, ...restApplication } = req.body;

    const result = await prisma.application.create({
      data: {
        ...restApplication,
        zipCode: +zipCode,
        dateOfBirth: dateOfBirthFormatted,
        applicationReference: uuid(),
      },
    });

    if (vehicles) {
      for (const { year, ...restVehicle } of vehicles) {
        await prisma.vehicle.create({
          data: { ...restVehicle, year: +year, applicationId: result.id },
        });
      }
    }

    res.status(201).send(
      JSON.stringify({
        status: "SUCCESS",
        results: `${process.env.FRONTEND_URL}/resume?ref=${result.applicationReference}`,
      })
    );
  }
};

export const getApplication = async (req: Request, res: Response) => {
  if (!req.params["applicationRef"]) {
    res.status(422).send(
      JSON.stringify({
        status: "MISSING_VALUES",
        message: "No application reference provided",
      })
    );
  } else {
    const appResult = await prisma.application.findFirst({
      where: {
        applicationReference: req.params.applicationRef,
      },
    });

    if (!appResult) {
      res.status(404).send(JSON.stringify(appResult));
    } else {
      const vehicleResult = await prisma.vehicle.findMany({
        where: {
          applicationId: appResult.id,
        },
      });

      res.status(200).send(
        JSON.stringify({
          ...appResult,
          dateOfBirth: appResult.dateOfBirth
            ? format(appResult.dateOfBirth, "03-30-1992")
            : null,
          vehicles: vehicleResult,
        })
      );
    }
  }
};

export const updateApplication = async (req: Request, res: Response) => {
  const { vehicles, zipCode, ...restApplication } = req.body;

  const application = await prisma.application.findFirst({
    select: {
      id: true,
    },
    where: {
      applicationReference: req.params["applicationRef"],
    },
  });

  if (!application)
    res.status(500).send(
      JSON.stringify({
        status: "FAIL",
        message: "Application not found in system",
      })
    );
  else {
    await prisma.application.update({
      where: {
        id: application["id"],
      },
      data: {
        ...restApplication,
        zipCode: +zipCode,
      },
    });

    if (vehicles.length > 0) {
      await prisma.vehicle.deleteMany({
        where: {
          applicationId: application["id"],
        },
      });

      for (const { year, ...restVehicle } of vehicles) {
        await prisma.vehicle.create({
          data: {
            ...restVehicle,
            applicationId: application["id"],
            year: +year,
          },
        });
      }
    }

    res.status(201).send(
      JSON.stringify({
        status: "SUCCESS",
      })
    );
  }
};

export const getQuote = (req: Request, res: Response) => {
  const baseQuote = 30;
  const { dateOfBirth, ...restApplication } = req.body;
  const [isValid, messages] = validateApplicationData({
    dateOfBirth: getFormattedDOB(dateOfBirth),
    ...restApplication,
  });

  if (!isValid)
    res.status(400).send(
      JSON.stringify({
        status: "FAIL",
        messages,
      })
    );
  else
    res.status(201).send(
      JSON.stringify({
        status: "SUCCESS",
        data: baseQuote * req.body["vehicles"].length,
      })
    );
};
