import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';

import { Token } from './token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  name: string = '';

  reservadas = [
    { nome: "(", funcao: "Abre parenteses" },
    { nome: ")", funcao: "Fecha parenteses" },
    { nome: "{", funcao: "Abre chaves" },
    { nome: "}", funcao: "Fecha chaves" },
    { nome: "'", funcao: "Aspas simples" },
    { nome: '"', funcao: "Aspas duplas" },
    { nome: "==", funcao: "igual" },
    { nome: "!=", funcao: "Não igual" },
    { nome: "===", funcao: "Estritamente igual" },
    { nome: "!==", funcao: "Estritamente não igual" },
    { nome: ">", funcao: "Maior que" },
    { nome: ">=", funcao: "Maior que ou igual" },
    { nome: "<", funcao: "Menor que" },
    { nome: ">=", funcao: "Menor que ou igual" },
    { nome: "%", funcao: "Módulo" },
    { nome: "++", funcao: "Incremento" },
    { nome: "--", funcao: "Decremento" },
    { nome: "-", funcao: "Negação" },
    { nome: "+", funcao: "Adição" },
    { nome: "**", funcao: "Operador de exponenciação" },
    { nome: "var", funcao: "Define variavel" },
    { nome: "if", funcao: "Codicional Se" },
    { nome: "else", funcao: "Condicional Se não" },
    { nome: "for", funcao: "Laço de repetição" },
    { nome: "while", funcao: "Laço de repetição" },
    { nome: "do", funcao: "Codicional faça" },
    { nome: "if else", funcao: "Codicional Se se não" },
    { nome: ";", funcao: "Terminador" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },
    { nome: "", funcao: "" },


  ]

  codFonte: string =
  ` var trabalho;

    if ( trabalho == 'feito' ){
        alert('Passou')
    }

    else
        alert('Se deu MALLLL!!!')`;


  token: Token[] = [];


  ngOnInit() {
    //this.estractWord();
  }


  compiler() {
    this.token = [];
    this.codFonte += "\n";
    this.estractWord();
  }

  /*  Verifica o codigo fonte ................................ */
  public estractWord() {
    let linha: number = 0;
    let coluna: number = 0;
    let fixColuna: number = 0;
    let qtdCaracters: number = this.codFonte.length;
    let palavra: string = "";
    let aspas: boolean = false;

    //  Percorre as linhas do código fonte.
    for (let i = 0; i <= qtdCaracters; i++) {

      //  Incrementa a linha e zera a coluna.
      if (this.codFonte.charAt(i) == "\n") {
        linha++;
        coluna = 0;
      }

      if (aspas) { // Captura os caracteres até que feche as aspas.
        palavra += this.codFonte.charAt(i);

        if (this.codFonte.charAt(i + 1) == "'") {
          palavra += "'";
          aspas = false;
          this.token.push(new Token(palavra, 'Constante', linha + ", " + fixColuna))

          palavra = "";
          fixColuna = 0;
          i++;
        }

      }

      else {
        //  Insere a palavra no array e Limpa a string palavra 
        if ((this.codFonte.charAt(i) == " " || this.codFonte.charAt(i) == "\n") && palavra != "") {
          this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + ", " + fixColuna))

          palavra = "";
          fixColuna = 0;
        }

        if (this.codFonte.charAt(i) != " " && this.codFonte.charAt(i) != "\n"
          && this.codFonte.charAt(i) != "("
          && this.codFonte.charAt(i) != ")"
          && this.codFonte.charAt(i) != "{"
          && this.codFonte.charAt(i) != "}"
          //&& this.codFonte.charAt(i) != "'"
          && this.codFonte.charAt(i) != ";") {

          if (palavra == "") // Fixa a coluna no inicio da palavra.
            fixColuna = coluna;

          if (this.codFonte.charAt(i) == "'") //  Caso for aberto aspas altera o indicador de aspas.
            aspas = true;

          palavra += this.codFonte.charAt(i);
          console.log(palavra)
        }

        else if (this.codFonte.charAt(i) != " " && this.codFonte.charAt(i) != "\n") {
          if (palavra == "")
            this.token.push(new Token(this.codFonte.charAt(i), this.pesquisaReservada(this.codFonte.charAt(i)), linha + "," + coluna))
          else {
            this.token.push(new Token(palavra, this.pesquisaReservada(palavra), linha + "," + fixColuna))
            this.token.push(new Token(this.codFonte.charAt(i), this.pesquisaReservada(this.codFonte.charAt(i)), linha + "," + coluna))
            palavra = ""
            fixColuna = 0
          }

        }
      }
      coluna++; //  Incrementa a coluna.
    }
  }

  pesquisaReservada(palavra) {
    let v: any = this.reservadas.filter(value => {
      return value.nome == palavra
    })

    console.log(v)
    if (v.length > 0)
      return v[0].funcao
    return "Identificador"
  }

}
