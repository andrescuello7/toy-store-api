import fs from "fs";
import readline from "readline";
import { MongoModels } from "../models/origin/mongoModelService";
import { MySqlModels } from "../models/origin/mysqlModelService";
import { PrismaModels } from "../models/prisma/prismaModelService";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const mongoModels = new MongoModels();
const mysqlModels = new MySqlModels();
const prismaModels = new PrismaModels();

const fileService = () => {
  console.log("Add new model \n");
  console.log(`
    [1] Prisma Name \n
    [2] Mongo Name | Deleted \n
    [3] MySql Name | Deleted \n
  `);

  input.on("line", (line) => {
    let file = line.slice(2);
    let num = line[0];
    switch (num) {
      case "1":
        createModel(file, prismaModels);
        break;
      case "2":
        createModel(file, mongoModels);
        break;
      case "3":
        createModel(file, mysqlModels);
        break;
      default:
        process.exit(0);
    }
  });
};

const createModel = (file: string, model: any) => {
  fs.mkdir(`./src/${file}/`, async () => {
    if (model == mongoModels) {
      fs.writeFile(
        `./src/${file}/${file}Model.ts`,
        await model.model(file),
        () => {}
      );
    }
    fs.writeFile(
      `./src/${file}/${file}Router.ts`,
      await model.route(file),
      () => {}
    );
    fs.writeFile(
      `./src/${file}/${file}Controller.ts`,
      await model.controller(file),
      () => {
        process.exit(0);
      }
    );
  });
};

fileService();
