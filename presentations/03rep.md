# Web-Technologie

## Animation & Interaktion



## Wiederholung


### Datentypen

Bei uns: Zahlen oder Texte

Bestimmen, was der PC damit machen kann, z.B.

* Zahlen: addieren, subtrahieren, multiplizieren, ...
* Texte: aneinanderhängen, Länge berechnen, ...

```js
"asdf"
3.57
```



## Befehle

Befehle werden immer mit runden Klammern aufgerufen `Befehl()`. Braucht der Befehl
zusätzliche Informationen um den Rückgabewert zu bestimmen, kommen diese als *Argumente" in die runden Klammern:

```js
// Math.sqrt() muss wissen, von welcher Zahl
// die Wurzel gezogen werden soll
Math.sqrt(9)  // -> 3
// Math.max() muss wissen, von welchen Zahlen
// das Maximum zurückgegeben werden soll
Math.max(8, 1, 4, 0, 6) // -> 8
```


## Eingebaute Befehle

`alert()` zeigt ein Nachrichtenfenster mit dem eingegebenen Argument an:

```js
alert(1234)
```


`console.log()` gibt das eingegebene Argument im Konsolenfenster aus:

```js
console.log(3.14159)
```


`prompt()` fragt den Benutzer nach einer Eingabe:

```js
prompt("Wie ist dein Name?")
```

!! Achtung, der Rückgabewert (die Antwort des Benutzers) ist **immer** ein Text.



### Variablen

Informationen werden in Variablen gespeichert:

```js
var name = prompt("Wie ist dein Name?")
```

und können über den Variablennamen wieder verwendet werden:

```js
alert(name)
```


### Variablen überschreiben

Variablen können überschrieben werden:

```js
var alter = '19'                // alter ist vom Typ Text
alter = Number(alter)           // alter wird überschrieben
                                // mit einer Zahl
alter = alter + 1               // das alter wird um 1 erhöht
console.log('alter: ' + alter)  // -> 'alter: 20'
```


### Variablen überschreiben

```js
var name = 'Reto'
var name2 = name
name = 'Andreas'
```

welcher Wert ist in `name2` gespeichert?



## Bedingungen

Code wird nur ausgeführt, wenn die Bedingung wahr ist:

```js
var alter = prompt("Wie alt bist du?")
alter = Number(alter)
if(alter < 18) {
  alert("Du darfst nicht autofahren")
}
```


## Bedingungen 2

Falls die Bedingung nicht wahr ist:

```js
var alter = prompt("Wie alt bist du?")
alter = Number(alter)
if(alter < 18) {
  alert("Du darfst nicht autofahren")
} else {
  alert("Du darfst autofahren")
}
```



## Schleifen

Sind dazu da, einen Codeteil zu wiederholen solange die while-Bedingung wahr ist:

```js
var alter = 18
var i = 1
while(i <= alter) {
  console.log("Happy Birthday zum " + i + ". Geburtstag")
  i = i + 1
}
```

Die Variable `i` wird im Codeblock immer um `1` hochgezählt (`i = i + 1`).

* Zu welchen Geburtstagen gratuliert das Programm?
* Welchen Wert hat die Variable `i` am Schluss?



## Modulo-Operator

Rechnet den **Rest** der Division aus!

* `12%5` gibt 2 (12 / 5 = 2 Rest *2*)
* `12%6` gibt 0 (12 / 6 = 2 Rest *0*)

Zum Testen, ob eine Zahl gerade oder ungerade ist (oder: ohne rest durch 2 teilbar)

`if(a % 2 == 0)` -> Zahl ist durch 2 teilbar -> gerade
