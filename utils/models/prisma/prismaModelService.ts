export class PrismaModels {
  async route(file: string) {
    let fullName = file[0].toUpperCase() + file.slice(1);
    return await `import { Router } from "express";
        import { post${fullName}, get${fullName}, put${fullName}, delete${fullName} } from "./${file}Controller";

        const router: Router = Router();

        router.get("/", get${fullName});
        router.post("/", post${fullName});
        router.put("/:id", put${fullName});
        router.delete("/:id", delete${fullName});

        export default router;`;
  }

  async controller(file: string) {
    let fullName = file[0].toUpperCase() + file.slice(1);
    return await `import prisma from "../../config/prisma";
            import { Request, Response } from "express";
            
            export async function get${fullName}(req: Request, res: Response) {
              try {
                const response = await prisma.${file}.findMany();
                res.status(200).send({ ${file}: response });
              } catch (error: any) {
                res.status(400).send({ error: "error GET" });
              }
            }
            
            export async function post${fullName}(req: Request, res: Response) {
              try {
                const response = await prisma.${file}.create({
                  data: req.body,
                });
                res.status(200).send({ ${file}: response });
              } catch (error: any) {
                res.status(400).send({ error: "error POST" });
              }
            }
            export async function put${fullName}(req: Request, res: Response) {
              const { id } = req.params;
              try {
                const response = await prisma.${file}.update({
                  where: { id },
                  data: req.body,
                });
                res.status(200).send({ ${file}: response });
              } catch (error: any) {
                res.status(400).send({ error: "error PUT" });
              }
            }
            
            export async function delete${fullName}(req: Request, res: Response) {
              const { id } = req.params;
              try {
                const response = await prisma.${file}.delete({
                  where: { id },
                });
                res.status(200).send({ ${file}: response });
              } catch (error: any) {
                res.status(400).send({ error: "error DELETE" });
              }
            }`;
  }
}
