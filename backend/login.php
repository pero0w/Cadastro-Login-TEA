<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$conn = new mysqli("localhost", "root", "", "app_cadastro");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Erro de conexão"]));
}

$data = json_decode(file_get_contents("php://input"));
$email = $conn->real_escape_string($data->email);
$senha = $data->senha;

$sql = "SELECT * FROM usuarios WHERE email = '$email'";
$result = $conn->query($sql);

if ($result && $result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($senha, $user['senha'])) {
        echo json_encode(["success" => true, "message" => "Login bem-sucedido", "usuario" => $user]);
    } else {
        echo json_encode(["success" => false, "message" => "Senha incorreta"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Usuário não encontrado"]);
}

$conn->close();
?>
