
import Cabecalho from '../../components/cabecalho'
import Menu from '../../components/menu'

import { Container, Conteudo } from './styled'

import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

import React, { useEffect, useRef } from 'react'
import LoadingBar from 'react-top-loading-bar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useState } from 'react';

import Api from '../../services/Api.js';
const api = new Api();


export default function Index() {

    const [alunos, setAlunos ] = useState([]);
    const [nome, setNome] = useState('');
    const [curso, setCurso] = useState('');
    const [turma, setTurma] = useState('');
    const [chamada, setChamada] = useState('');
    const [idAlterado, setIdAlterado] = useState(0);

    const loading = useRef(null)


    async function Listar() {
        const a = await api.Listar();
        setAlunos(a)
    }

    function LimparCampos() {
        setNome('');
        setCurso('');
        setTurma('');
        setChamada('');
        setIdAlterado(0);
    }
    
    useEffect(() => {
        Listar();
    }, [])


    async function inserir() {
        loading.current.continuousStart();

        if (chamada > 0) {

            let a = turma == '' || nome == '' || curso == '' || chamada == ''
            if(a == true ) {
                toast.error('Campos estão vazios'); 
                loading.current.complete()
                Listar();
            }  
            if(idAlterado == 0) {
                let a = await api.Inserir(nome,curso,turma,chamada)    
                toast.success('Aluno Adicionado'); 
                loading.current.complete()
                Listar();
            }
            else {          
                let a = await api.Editar(idAlterado,nome,curso,turma,chamada)
                toast.success('Aluno Editado');

                Listar()

                loading.current.complete()
            }  
                   

        } else if(chamada < 0) {
            toast.error('Números negativos não são aceitos'); 
            loading.current.complete()
        } else if (isNaN(chamada) == true) {
            toast.error('Campo chamada devem ser número');
            loading.current.complete()
        } else if (chamada === '') {
            toast.error('Campos estão vazios'); 
            loading.current.complete()
        } else if ()
            toast.error('Número de chamada ja existente')
            loading.current.complete()
        {
            
        }         

       

        loading.current.complete()
        Listar()
        LimparCampos()
    }

    async function remover1(id){
        let x = await api.Remover(id)
        Listar();
    }

    async function remover(id) {

        confirmAlert({
            
            title: 'Deseja deletar esse Aluno',
            message: `Você tem certeza de remover aluno ${id} ?`,
            buttons: [
              {
                label: 'Sim',
                onClick: (a = remover1(id)) => toast.warn('Aluno Removido')
              },
              {
                label: 'Não',
                onClick: (a = api.Listar()) => toast.success('Aluno Mantido')
              }
            ]
        });
        
    }

    async function editar(item) {
        setNome(item.nm_aluno);
        setCurso(item.nm_curso);
        setTurma(item.nm_turma);
        setChamada(item.nr_chamada);
        setIdAlterado(item.id_matricula);
    }


    return (
        <Container>
            <Menu />
            <Conteudo>
                <Cabecalho />
                <ToastContainer />
                <LoadingBar color='#f11946' ref={loading} />
                <div class="body-right-box">
                    <div class="new-student-box">
                        
                        <div class="text-new-student">
                            <div class="bar-new-student"></div>
                            <div class="text-new-student">{idAlterado == 0 ? "Novo Aluno" : "Alterando Aluno " + idAlterado}</div>
                        </div>

                        <div class="input-new-student"> 
                            <div class="input-left">
                                <div class="agp-input"> 
                                    <div class="name-student"> Nome: </div>  
                                    <div class="input"> <input type="text" value={ nome } onChange={e => setNome(e.target.value)}   /> </div>  
                                </div> 
                                <div class="agp-input">
                                    <div class="number-student"> Chamada: </div>  
                                    <div class="input"> <input type="text"  value={ chamada } onChange={e => setChamada(e.target.value)} /> </div> 
                                </div>
                            </div>

                            <div class="input-right">
                                <div class="agp-input">
                                    <div class="corse-student"> Curso: </div>  
                                    <div class="input"> <input type="text"  value={ curso } onChange={e => setCurso(e.target.value)} /> </div>  
                                </div>
                                <div class="agp-input">
                                    <div class="class-student"> Turma: </div>  
                                    <div  class="input"> <input type="text"  value={ turma } onChange={e => setTurma(e.target.value)} /> </div> 
                                </div>
                            </div>
                            <div class="button-create"> <button onClick={ inserir }  > {idAlterado == 0 ? "Cadastrado" : "Alterar"} </button> </div>
                        </div>
                    </div>   


                    <div class="student-registered-box">
                        <div class="row-bar"> 
                            <div class="bar-new-student"> </div>
                            <div class="text-registered-student"> Alunos Matriculados </div>
                        </div>
                    
                        <table class ="table-user">
                            <thead>
                                <tr>
                                    <th> ID </th>
                                    <th> Nome </th>
                                    <th> Chamada </th>
                                    <th> Turma </th>
                                    <th> Curso </th>
                                    <th class="coluna-acao"> </th>
                                    <th class="coluna-acao"> </th>
                                </tr>
                            </thead>
                    
                            <tbody>
                                {alunos.map((item, i) =>
                                    <tr className = { i % 2  == 0 ? "linha-alternada" : ""}>
                                        <td> {item.id_matricula} </td>
                                        <td title={item.nm_aluno}>
                                            {item.nm_aluno != null && item.nm_aluno.length >= 25 
                                                ? item.nm_aluno.substr(0,25) + '...'
                                                : item.nm_aluno}

                                        </td>
                                        <td> {item.nr_chamada} </td>
                                        <td> {item.nm_turma} </td>
                                        <td> {item.nm_curso} </td>
                                        <td className="coluna-acao"> <button onClick={() => editar(item)}> <img src="/assets/images/edit.svg" alt="" /> </button> </td>
                                        <td className="coluna-acao"> <button onClick={() => remover(item.id_matricula)}> <img src="/assets/images/trash.svg" alt="" /> </button> </td>
                                    </tr>
                                )}
                                
                            </tbody> 
                        </table>
                    </div>
                </div>
            </Conteudo>
        </Container>
    )
}
