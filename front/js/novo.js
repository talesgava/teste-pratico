const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];
const url = 'http://localhost:3000/';

for (estado in estados) {
    $("#estado_ponto").append(new Option (estados[estado], estados[estado]));
};

function limpar_campos (){
    $("#nome_ponto").val("");
    $("#cidade_ponto").val("");
    $("#referencia_ponto").val("");
    $("#descritivo_ponto").val("");
    $('#estado_ponto').val("");
};

function chamar_modal(titulo, mensagem){
    $("#modalmensagem").html(titulo);
    $(".mensagemprincipal").html(mensagem);
    $('#modalauxiliar').modal('show');
};

$("#cadastrar_ponto").click(function(){
    event.preventDefault();
    const nome_ponto = $("#nome_ponto").val();
    const cidade_ponto = $("#cidade_ponto").val();
    const referencia_ponto = $("#referencia_ponto").val();
    const descritivo_ponto = $("#descritivo_ponto").val();
    const estado_ponto = $('#estado_ponto option:selected').val();

    if(descritivo_ponto.length > 100) {
        chamar_modal("Atenção!","O campo de descrição não pode ter mais do que 100 caracteres.");
        return;
    };
    
    if (nome_ponto != '' && cidade_ponto != '' && referencia_ponto != '' && descritivo_ponto != '' && estado_ponto != '') {
        const nome = $("#nome_ponto").val();
        const cidade = $("#cidade_ponto").val();
        const referencia = $("#referencia_ponto").val();
        const descritivo = $("#descritivo_ponto").val();
        const estado = $('#estado_ponto').val();
        
        $.ajax({
            type: "POST",
            url: url + "ponto_turistico/",
            data: {
                nome: nome,
                cidade: cidade,
                referencia: referencia,
                descritivo: descritivo,
                estado: estado
            },
        }).done(function (data) {
            chamar_modal("Sucesso!", JSON.stringify(data.resposta.mensagem).replace(/"/g, ''));
            limpar_campos();
            console.log(JSON.stringify(data));
        }).fail(function (jqXHR, textStatus, errorThrown) {
            chamar_modal("Erro!", "Não foi possível salvar o ponto turístico, tente novamente");
        });
    } else {
        chamar_modal("Atenção!","Preencha todos os campos obrigatórios.");
    };
    
});

