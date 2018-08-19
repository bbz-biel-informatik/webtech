# Web-Technologie

## Animation & Interaktion



## Funktionen

* alert()
* prompt()



## Zweck

* Code organisieren
* Code wiederverwenden



## Definition

```js
function quadrat(x) {
  return x * x;
}
```

## Aufruf

```js
quadrat(3);
```



## Aufbau

```js
function name(parameter) {
  code
  return x;
}
```

* name: beliebiger Name
* parameter: Werte, die an die Funktion übergeben werden, mit Komma abgetrennt
* code: beliebiger Code
* optionales return: Wert, der als Resultat zurückgegeben werden soll



## Parameter

```js
function multiplikation(x, y) {
  return x * y;
}

multiplikation(3,4);
```

* Keiner, einer oder mehrere Parameter erlaubt
* Können in der Funktion verwendet werden



## Return

Return gibt einen Wert als Resultat an den aufrufenden Code zurück

```js
function quadrat(x) {
  return x * x;
}

var a = quadrat(3);
```

`a` hat nun den Wert 9.
