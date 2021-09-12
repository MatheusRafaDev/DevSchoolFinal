import axios from 'axios'
const api = axios.create({
    baseURL: 'http://localhost:3030'
})

export default class Api {

    async Inserir(NomeAluno,CursoAluno,TurmaAluno,ChamadaAluno) {

        let a = {
            nm_aluno: NomeAluno,
            nm_curso: CursoAluno,
            nm_turma: TurmaAluno,
            nr_chamada: ChamadaAluno
        };

        let r = await api.post(`/matricula`, a);
        return r.data;
    }

    async Listar() {
        let r = await api.get(`/matricula`);
        return r.data;
    }

    async Remover(id) {
        const a = await api.delete('/matricula/' + id);
        return a.data;
    }

    async Editar(id,nome,curso,turma,chamada) {

        const a = await api.put('/matricula/' + id, {nome,curso,turma,chamada});
        return a.data;
    }   
}