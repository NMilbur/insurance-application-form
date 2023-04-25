import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { Request, Response } from "express";
import { format, isDate, parse } from "date-fns";

const prisma = new PrismaClient();

export const createApplication = async (req: Request, res: Response) => {
  let isValid = true;
  let dateOfBirthFormatted: Date | null = null;
  const messages = [];

  // validate that first and last name have been given
  if (!req.body["firstName"]) {
    isValid = false;
    messages.push("First name is required");
  }

  if (!req.body["lastName"]) {
    isValid = false;
    messages.push("Last name is required");
  }

  if (req.body["dateOfBirth"]) {
    dateOfBirthFormatted = parse(
      req.body["dateOfBirth"],
      "MM-dd-yyyy",
      new Date()
    );

    if (!isDate(dateOfBirthFormatted)) {
      isValid = false;
      messages.push("Date of birth must be formatted as MM-DD-YYYY");
    }
  }

  if (!isValid) {
    res.status(422).send(
      JSON.stringify({
        status: "MISSING_VALUES",
        messages,
      })
    );
  } else {
    // if dob given, validate valid date

    // extract vehicles
    const { vehicles } = req.body;

    // insert into db, create uuid
    const result = await prisma.application.create({
      data: {
        ...req.body,
        dateOfBirth: dateOfBirthFormatted,
        applicationReference: uuid(),
      },
    });

    if (vehicles) {
      for (const vehicle of vehicles) {
        await prisma.vehicle.create({
          data: { ...vehicle },
        });
      }
    }

    // return route to app with uuid in query string
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
