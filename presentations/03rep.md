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



## Eingebaute Befehle

`alert()` zeigt ein Nachrichtenfenster an:

```js
alert(1234)
```

`prompt()` fragt den Benutzer nach einer Eingabe:

```js
prompt("Wie ist dein Name?")
```



### Variablen

Informationen werden in Variablen gespeichert:

```js
var name = prompt("Wie ist dein Name?")
```

und können über den Variablennamen wieder verwendet werden:

```js
alert(name)
```



## Bedingungen

Code wird nur ausgeführt, wenn die Bedingung wahr ist:

```js
var alter = prompt("Wie alt bist du?")
if(alter < 18) {
  alert("Du darfst nicht autofahren")
}
```


## Bedingungen 2

Falls die Bedingung nicht wahr ist:

```js
var alter = prompt("Wie alt bist du?")
if(alter < 18) {
  alert("Du darfst nicht autofahren")
} else {
  alert("Du darfst autofahren");
}
```



## Schleifen

Sind dazu da, einen Codeteil zu wiederholen

```js
var alter = 18;
for(var i = 1; i <= alter; i = i + 1) {
  alert("Happy Birthday zum " + i + ". Geburtstag")
}
```

wird wiederholt, solange die Bedingung wahr ist (d.h. die Variable `i` zählt von von 1 bis 18)



## Modulo-Operator

Rechnet den **Rest** der Division aus!

* `12%5` gibt 2 (12 / 5 = 2 Rest *2*)
* `12%6` gibt 0 (12 / 6 = 2 Rest *0*)

Zum Testen, ob eine Zahl gerade oder ungerade ist (oder: durch 2 teilbar)

`if(a % 2 == 0)` -> Zahl ist durch 2 teilbar -> gerade
