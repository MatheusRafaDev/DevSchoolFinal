import db from "./db.js";
import Express from "express";
import Cors from "cors";

const app = Express();
app.use(Cors());
app.use(Express.json());


app.get("/matricula", async (req, resp) => {
    try {
        let alunos = await db.tb_matricula.findAll({ order: [['id_matricula', 'desc']] });
        resp.send(alunos);
    } catch (e) {
        resp.send(e.toString());
    }
});

app.post("/matricula", async (req, resp) => {
    try {
        let a = req.body
    
        let alunos = await db.tb_matricula.create ({
            nm_aluno: a.nm_aluno,
            nr_chamada: a.nr_chamada,
            nm_curso: a.nm_curso,
            nm_turma: a.nm_turma
        })
        resp.send(alunos);

    } catch (e) {
        resp.send(e.toString());
    }
    
});    

app.delete("/matricula/:id", async (req,resp) => {
    try { 
        let id = req.params.id
        let q = await db.tb_matricula.destroy({ where:{ id_matricula: id }})

        resp.sendStatus(200); 
    }
    catch(e) {
         resp.send("Erro")
         console.log(e.toString());
    }
});

app.put("/matricula/:id", async (req,resp) => {
    try { 
     let id = req.params.id
     let { nome,chamada,curso,turma} = req.body;

 
     let q = await db.tb_matricula.update({nm_aluno: nome,nr_chamada: chamada,nm_curso: curso,nm_turma: turma }, {where: { id_matricula: id } })
 
     resp.sendStatus(200);

    } catch (error) {
        resp.send(error.toString("Erro"))
    }
 });
 
 
 app.listen(process.env.PORT, (x) =>
     console.log(`Subiu na Porta ${process.env.PORT} Cacete`)
 );