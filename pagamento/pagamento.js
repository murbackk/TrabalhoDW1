
  function gerarPayloadPix(chave, valor, nome, cidade) {
    const formatarValor = parseFloat(valor).toFixed(2);

    const chavePixField = '0014br.gov.bcb.pix' + '01' + chave.length.toString().padStart(2, '0') + chave;
    const chavePixLength = chavePixField.length.toString().padStart(2, '0');

    const payload = [
      '000201',
      '26' + chavePixLength + chavePixField,
      '52040000',
      '5303986',
      '54' + formatarValor.length.toString().padStart(2, '0') + formatarValor,
      '5802BR',
      '59' + nome.length.toString().padStart(2, '0') + nome,
      '60' + cidade.length.toString().padStart(2, '0') + cidade,
      '62070503***'
    ];

    let payloadStr = payload.join('');
    const crc = crc16(payloadStr + '6304');
    payloadStr += '6304' + crc;

    return payloadStr;
  }

  function crc16(str) {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        if ((crc & 0x8000) !== 0) {
          crc = (crc << 1) ^ 0x1021;
        } else {
          crc <<= 1;
        }
      }
    }
    return ((crc ^ 0x0000) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
  }

  function gerarQRCode(valor) {
    const chavePix = "marcelinomaria159@gmail.com";
    const nomeRecebedor = "MARIA ELISA MURBACK MARCELINO";
    const cidade = "MAMBORE";

    const payload = gerarPayloadPix(chavePix, valor, nomeRecebedor, cidade);

    
    

    const qrDiv = document.getElementById("qrcode");
    qrDiv.innerHTML = "";
    new QRCode(qrDiv, {
      text: payload,
      width: 300,
      height: 300
    });
  }

  function toggleMenu() {
    const menu = document.getElementById("menu-items");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  };

  document.getElementById("pix-option").onclick = () => {
    document.querySelector(".pagamento-options").style.display = "none";
    document.getElementById("pix-qrcode").style.display = "block";
    document.getElementById("pagamento-realizado").style.display = "block";

    const valor = localStorage.getItem("valorTotalCarrinho") || "0.00";
    gerarQRCode(valor);
  };

  document.getElementById("cartao-option").onclick = () => {
    document.querySelector(".pagamento-options").style.display = "none";
    document.getElementById("form-cartao").style.display = "block";
  };

  function validarCartao() {
    const input = document.getElementById("numero-cartao").value.replace(/\D/g, "");
    let soma = 0;
    let alternar = false;

    for (let i = input.length - 1; i >= 0; i--) {
      let n = parseInt(input.charAt(i));
      if (alternar) {
        n *= 2;
        if (n > 9) n -= 9;
      }
      soma += n;
      alternar = !alternar;
    }

    const valido = soma % 10 === 0;
    const status = document.getElementById("cartao-status");
    if (valido) {
      status.textContent = "Cartão válido ✅";
      status.style.color = "green";
      document.getElementById("pagamento-realizado").style.display = "block";
    } else {
      status.textContent = "Cartão inválido ❌";
      status.style.color = "red";
    }
  }
  window.onload = () => {
    const valor = localStorage.getItem("valorTotalCarrinho") || "0.00";
    document.getElementById("valor-pix").textContent = `Valor: R$ ${valor}`;
  };