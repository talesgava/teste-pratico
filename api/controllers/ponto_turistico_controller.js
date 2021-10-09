const mysql = require("../mysql").pool;

exports.getPontosTuristicos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT * FROM ponto_turistico ORDER BY criado_em DESC LIMIT 100",
      (error, result, fields) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        if (result.length === 0) {
          const resposta = {
            quantidade: result.length,
            mensagem: "Nenhum registro encontrado.",
          };
          return res.status(200).send({ resposta });
        }

        const resposta = {
          quantidade: result.length,
          pontosTuristicos: result.map((ponto) => {
            return {
              id_ponto: ponto.id,
              nome: ponto.nome,
              estado: ponto.estado,
              cidade: ponto.cidade,
              referencia: ponto.referencia,
              descritivo: ponto.descritivo,
            };
          }),
        };

        return res.status(200).send({ resposta });
      }
    );
  });
};

exports.getBuscarPontosTuristicos = (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "SELECT nome, estado, cidade, referencia, descritivo, criado_em " +
        "FROM ponto_turistico " +
        "WHERE nome LIKE concat('%', ?, '%') OR estado LIKE concat('%', ?, '%') OR cidade LIKE concat('%', ?, '%') OR referencia LIKE concat('%', ?, '%') OR descritivo LIKE concat('%', ?, '%') " +
        "ORDER BY criado_em DESC LIMIT 100",
      [
        req.params.textodebusca,
        req.params.textodebusca,
        req.params.textodebusca,
        req.params.textodebusca,
        req.params.textodebusca,
      ],
      (error, result, fields) => {
        conn.release();
        if (error) {
          return res.status(500).send({ error: error });
        }

        if (result.length === 0) {
          const resposta = {
            quantidade: result.length,
            mensagem: "Nenhum registro encontrado.",
          };
          return res.status(200).send({ resposta });
        }

        const resposta = {
          quantidade: result.length,
          pontosTuristicos: result.map((ponto) => {
            return {
              id_ponto: ponto.id,
              nome: ponto.nome,
              estado: ponto.estado,
              cidade: ponto.cidade,
              referencia: ponto.referencia,
              descritivo: ponto.descritivo,
            };
          }),
        };

        return res.status(200).send({ resposta });
      }
    );
  });
};

exports.salvarPontoTuristico = (req, res, next) => {
  if (
    req.body.nome === "" ||
    req.body.nome === undefined ||
    req.body.estado === "" ||
    req.body.estado === undefined ||
    req.body.cidade === "" ||
    req.body.cidade === undefined ||
    req.body.referencia === "" ||
    req.body.referencia === undefined ||
    req.body.descritivo === "" ||
    req.body.descritivo === undefined
  ) {
    return res.status(400).send({
      mensagem: "Campos faltando ou em branco, não foi possível inserir.",
    });
  }

  if (req.body.descritivo.length > 100) {
    return res.status(400).send({
      mensagem: "Campo descritivo com mais de 100 caracteres não é permitido",
    });
  }

  mysql.getConnection((error, conn) => {
    if (error) {
      return res.status(500).send({ error: error });
    }
    conn.query(
      "INSERT INTO ponto_turistico (nome, estado, cidade, referencia, descritivo) VALUES (?,?,?,?,?)",
      [
        req.body.nome,
        req.body.estado,
        req.body.cidade,
        req.body.referencia,
        req.body.descritivo,
      ],
      (error, result, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({ error: error });
        }

        const resposta = {
          mensagem: "Ponto turistico inserido com sucesso",
          pontoCriado: {
            id_ponto: result.insertId,
            nome: req.body.nome,
            estado: req.body.estado,
            cidade: req.body.cidade,
            referencia: req.body.referencia,
            descritivo: req.body.descritivo,
          },
        };

        res.status(201).send({ resposta });
      }
    );
  });
};

exports.deletarPontoTuristico = (req, res, next) => {
  res.status(405).send({
    mensagem: "Não é permitido excluir.",
  });
};

exports.editarPontoTuristico = (req, res, next) => {
  res.status(405).send({
    mensagem: "Não é permitido editar um ponto turistico.",
  });
};
