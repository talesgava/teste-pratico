const url = "http://localhost:3000/";

var $paginacao = $(".pagination"),
  totalRegistros = 0,
  registros = [],
  registrosMostrar = [],
  registroPorPag = 2,
  pagina = 1,
  totalPaginas = 0;

function cria_ponto(data) {
  for (ponto in data) {
    $(".resultado_encontrado").append(
      '<p class="nome_ponto">' +
        data[ponto].nome +
        "</p>" +
        "<p>Localização: " +
        data[ponto].cidade +
        " - " +
        data[ponto].estado +
        "</p>" +
        '<p><button class="btn btn-primary botao_ver_detalhes" type="button" data-bs-toggle="collapse" data-bs-target="#ponto' +
        ponto +
        '" aria-expanded="false" aria-controls="ponto' +
        ponto +
        '" > Ver detalhes</button ></p > ' +
        '<div class="collapse" id="ponto' +
        ponto +
        '"><div class="card card-body"><p>Referência: ' +
        data[ponto].referencia +
        "</p><p> Descrição: " +
        data[ponto].descritivo +
        "</p></div></div>"
    );
  }
  $(".pagination").children().eq(0).find(">:first-child").html("Primeiro");
  $(".pagination").children().eq(1).find(">:first-child").html("Anterior");
  $(".pagination").children().eq(-1).find(">:first-child").html("Último");
  $(".pagination").children().eq(-2).find(">:first-child").html("Avançar");
}

function paginacao() {
  $paginacao.twbsPagination("destroy");
  $paginacao.twbsPagination({
    totalPages: totalPaginas,
    visiblePages: totalPaginas,
    onPageClick: function (event, pagina) {
      registrosMostradosIndex = Math.max(pagina - 1, 0) * registroPorPag;
      endRec = registrosMostradosIndex + registroPorPag;
      registrosMostrar = registros.slice(registrosMostradosIndex, endRec);
      $(".resultado_encontrado").html("");
      cria_ponto(registrosMostrar);
    },
  });
}

$(".buscar_ponto").click(function () {
  event.preventDefault();
  const texto_ponto_turistico = $("#buscar_ponto_turistico").val();
  if (texto_ponto_turistico != "") {
    $.ajax({
      type: "GET",
      url: url + "ponto_turistico/" + encodeURI(texto_ponto_turistico),
    })
      .done(function (data) {
        $(".resultado_encontrado").html("");
        $(".resultado_encontrado").show("");
        $(".resultado_nao_encontrado").hide();
        $(".pagination").show();
        if (data.resposta.quantidade === 0) {
          $(".resultado_label_nao_encontrado").html(
            JSON.stringify(data.resposta.mensagem).replace(/"/g, "")
          );
          $(".resultado_nao_encontrado").show();
          $(".pagination").hide();
          return;
        }
        registros = data.resposta.pontosTuristicos;
        console.log(JSON.stringify(registros));
        totalRegistros = data.resposta.pontosTuristicos.length;
        totalPaginas = Math.ceil(totalRegistros / registroPorPag);
        paginacao();
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        $(".resultado_encontrado").html("");
        $(".resultado_nao_encontrado").show();
        $(".resultado_label_nao_encontrado").html(
          "Ops, ocorreu um erro ao tentar buscar os dados, tente novamente."
        );
        $(".pagination").hide();
      });
  } else return;
});

window.addEventListener("load", function () {
  $.ajax({
    type: "GET",
    url: url + "ponto_turistico/",
  })
    .done(function (data) {
      $(".resultado_encontrado").html("");
      $(".resultado_nao_encontrado").hide();
      if (data.resposta.quantidade === 0) {
        $(".resultado_label_nao_encontrado").html(
          JSON.stringify(data.resposta.mensagem).replace(/"/g, "")
        );
        $(".resultado_nao_encontrado").show();
        $(".pagination").hide();
        return;
      }
      registros = data.resposta.pontosTuristicos;
      totalRegistros = data.resposta.pontosTuristicos.length;
      totalPaginas = Math.ceil(totalRegistros / registroPorPag);
      paginacao();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      $(".resultado_encontrado").html("");
      $(".resultado_nao_encontrado").show();
      $(".resultado_label_nao_encontrado").html(
        "Ops, ocorreu um erro ao tentar buscar os dados, recarregue a página e tente novamente."
      );
      $(".pagination").hide();
    });
});
