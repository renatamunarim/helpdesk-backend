import Chamado from '../models/Chamado.js'
import Usuario from '../models/Usuario.js'


export async function criarChamado(req, res) {
  try {
    console.log("USUÁRIO NO TOKEN:", req.usuario)
    console.log("DADOS RECEBIDOS:", req.body)

    if (!req.usuario) {
      return res.status(401).json({ erro: "Usuário não autenticado" })
    }

    const { titulo, descricao, categoria, prioridade } = req.body

    const chamado = await Chamado.create({
      titulo,
      descricao,
      categoria,
      prioridade,
      status: "aberto",
      usuarioId: req.usuario.id
    })

    res.status(201).json(chamado)
  } catch (erro) {
    console.error("ERRO AO CRIAR CHAMADO:", erro)
    res.status(500).json({ erro: erro.message })
  }
}


export async function listarChamadosUsuario(req, res) {
  try {
    const chamados = await Chamado.findAll({
      where: { usuarioId: req.usuario.id },
      include: [{
        model: Usuario,
        as: Usuario,
        attributes: ["nome"]
      }],
      order: [["criado_em", "DESC"]]
    })

    res.json(chamados)
  } catch (erro) {
    console.error("ERRO LISTAR USUÁRIO:", erro)
    res.status(500).json({ erro: erro.message })
  }
}


export async function listarTodosChamados(req, res) {
  try {
    if (req.usuario.perfil !== 'tecnico') {
      return res.status(403).json({ erro: 'Acesso negado' })
    }

    const chamados = await Chamado.findAll({
      include: {
        model: Usuario,
        attributes: ["nome"]
      },
      order: [["criado_em", "DESC"]]
    })

    res.json(chamados)
  } catch (erro) {
    console.error("ERRO NO /chamados/all:", erro)
    res.status(500).json({ erro: erro.message })
  }
}



export async function removerChamado(req, res) {
  try {
    const chamado = await Chamado.findByPk(req.params.id)
    if (!chamado) return res.status(404).json({ erro: 'Chamado não encontrado' })

    await chamado.destroy()
    res.json({ mensagem: 'Chamado removido com sucesso' })
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}

export async function relatorioChamados(req, res) {
  try {
    if (req.usuario.perfil !== "tecnico") {
      return res.status(403).json({ erro: "Acesso negado" })
    }

    const chamados = await Chamado.findAll({
      order: [["criado_em", "DESC"]],
    })

    const abertos = chamados.filter(c => c.status === "aberto")
    const andamento = chamados.filter(c => c.status === "em_andamento")
    const concluidos = chamados.filter(c => c.status === "concluido")

    return res.json({
      resumo: {
        abertos: abertos.length,
        andamento: andamento.length,
        concluidos: concluidos.length,
      },
      chamadosAbertos: abertos,
      chamadosAndamento: andamento,
      chamadosConcluidos: concluidos
    })

  } catch (erro) {
    return res.status(500).json({ erro: erro.message })
  }
}

export async function atualizarChamado(req, res) {
  try {
    const chamado = await Chamado.findByPk(req.params.id)

    if (!chamado) {
      return res.status(404).json({ erro: "Chamado não encontrado" })
    }

    const { status } = req.body

    if (!status) {
      return res.status(400).json({ erro: "Status é obrigatório" })
    }

    await chamado.update({ status })

    res.json(chamado)
  } catch (erro) {
    res.status(500).json({ erro: erro.message })
  }
}