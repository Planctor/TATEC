<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $mensagem = $_POST["mensagem"];
    $para = "marcospauloctavares@gmail.com";
    $assunto = "Mensagem do formulário de contato";

    $mensagem_completa = "Nome: $nome\n";
    $mensagem_completa .= "Email: $email\n";
    $mensagem_completa .= "Mensagem: $mensagem\n";

    // Use a função mail() para enviar o e-mail
    if (mail($para, $assunto, $mensagem_completa)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        http_response_code(500); // o formulÃ¡rio (scripts/contato.js) usa o status para mostrar o erro
        echo "Ocorreu um erro ao enviar a mensagem.";
    }
}
?>
