# Web-Technologie

## Animation & Interaktion



## Wiederholung

Verschiedene Datentypen

* Zahlen
* Texte
* Booleans

Werte speichern mit Variablen



## Zahlen

Rechnen wie gehabt

```js
3 * (12 - 6)
2 + 6 + 3
```



## Texte

```js
"Hans Müller"
'Reto Meier'
```

immer mit Anführungszeichen

`"Reto" + "Holz"` gibt `"RetoHolz"`



## Booleans

Resultat aus Vergleichen

```js
3 < 5
3 < (7 - 3)
"alfa" == "beta"
```



## Ein- und Ausgabe

```js
alert('Mein Text')
prompt('Wie alt bist du?')
```

`alert` zeigt den Text in einem Benachrichtigungsfenster an

`prompt` zeigt den Text in einem Benachrichtigungsfenster an und lässt den Benutzer eine Antwort eingeben



## Variablen

Werte speichern, um sie später zu verwenden.

Schlüsselwort `var` leitet die Variablendeklaration ein.

```js
var a = 4
var b = 7
var c = a + b
```



## Probleme

prompt gibt als Resultat immer einen Text!

<img data-src="images/prompt_string.png" width="400px">

und damit kann man nicht rechnen...



## Lösung

### Datentypen umwandeln

Text zu Zahl

```js
var alter_als_text = prompt("Wie alt bist du?")
var alter_als_zahl = Number(alter_als_text)
```

`Number(text)` wandelt alles, was zwischen den Klammern ist, in eine Zahl um (oder versucht es zumindest)


Zahl zu Text

```js
var num = 3
var dauer = String(num) + " Wochen"
```

`String(zahl)` wandelt alles zwischen den Klammern in einen Text um.

Weniger wichtig als `Number()`, weil Zahlen meist schon automatisch umgewandelt werden.



## Programmfluss



## Konditionale Ausführung
### oder
## Bedingungen



Codeteil nur unter bestimmten Bedingungen ausführen

```js
var alter = prompt("Wie alt bist du?")
if(Number(alter) < 18) {
  alert("Du bist minderjährig")
}
```

Nur wenn das Alter kleiner als 18 ist, zeigt das Programm "minderjährig" an



## Bedingungen

Schlüsselwort `if` leitet den Bedingungsblock ein

```js
if(bedingung) {
  code1
}
```


Was, wenn die Bedingung nicht wahr ist?

Schlüsselwort: `else`

```js
if(bedingung) {
  code1
} else {
  code2
}
```

der `else`-Block wird ausgeführt, wenn die Bedingung nicht wahr ist


Was, wenn es mehr als zwei Möglichkeiten gibt?

```js
if(bedingung1) {
  code1
} else if(bedingung2) {
  code2
} else {
  code3
}
```

Wenn Bedingung1 nicht wahr ist, wird Bedingung2 getestet.

Wichtig: es wird immer nur ein Codeblock ausgeführt!



## Wiederholte Ausführung
### oder
## Schleifen



Alle Zahlen zwischen 1 und 8 anzeigen:

```js
alert(1);
alert(2);
alert(3);
alert(4);
alert(5);
alert(6);
alert(7);
alert(8);
```

Mühsam, fehleranfällig, ...



## Schleifen

Schlüsselwort `while` leitet den Wiederholungsblock ein

```js
var zähler = 1;
while(zähler <= 8) {
  alert(zähler);
  zähler = zähler + 1;
}
```

Solange `zähler` kleiner oder gleich 8 ist, wird der aktuelle Wert von `zähler` angezeigt und dann um 1 erhöht. Danach läuft das Programm weiter.


In den meisten Fällen wird eine Zähler-Variable verwendet, die kontrolliert, wie viele Male der Code-Block ausgeführt wird.

```js
var zähler = 0;
while(bedingung) {
  code
  zähler = zähler + 1;
}
...
```

Wichtig: nicht vergessen, die Zähler-Variable hochzuzählen, sonst wird der Block unendlich ausgeführt!
