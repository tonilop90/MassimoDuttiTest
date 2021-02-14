# Antes de empezar:
- Para reportar tu trabajo debes crear un repositorio GIT público.

- Crea tantos commits como consideres necesario. Parte de nuestra evaluación se basa en como afrontas los problemas y la única forma que tenemos de verlo es mediante commits. Esta parte puede ser más decisiva que la calidad de la entrega.
- En el comentario del commit especifica los cambios que has realizado, así como explicaciones o aportaciones que consideres importante comentar. Valoraremos especialmente que los commits estén bien documentados
- En caso de que surjan dudas intenta buscar alternativas y justifícalas en el mensaje de commit.

# Tasks.

1.  RE-Estructura el proyecto como mejor consideres. 
    1.  Como mínimo se debe crear un modulo a parte para la autenticación y registro.
    2.  Implementa Interficies  o clases  para los tipos de datos que consideres.
2. Implementa un sistema de login/registro que persista los datos correctamente.
   1. Puedes utilizar:
      1. LocalStorage, 
      2. Alguna api externa
      3. Implementar servicio propio con Nodejs.
3. Implementa el patron de diseño redux para la gestion del listado de naves.
   1. No es necesario implementar redux para todo el aplicativo, solo para la gestión de naves.
4.  Implementa la carga de multiples "páginas" en el apartado de ships.
    1.   Actualmente solo carga una página de la api.
    2.   Revisar la API para saber como consumir el resto de páginas. https://swapi.dev/
5.  Implementa test unitarios para el modulo de login/registro.
6.  Añade imágenes a las CARDS de naves: Puedes usar esta api  'https://starwars-visualguide.com/assets/img/starships/' + ID_DE NAVE -->  https://starwars-visualguide.com/assets/img/starships/5.jpg
7.  Suponiendo que esta página tiene un numero elevado de usuarios simultáneos, implementa las mejoras que consideres oportunas para evitar la saturación del servidor.
    1.  Si alguna de las medidas no es de código, comentalas a continuación en este Readme.


# Getting Started 

`npm i`  for install
Run `npm run start` for a dev server. 
Navigate to `http://localhost:4200/`.


# Notas del desarrollador:

1. REESTRUCTURA:
    1. Generado el módulo de auth para alojar los componentes de Login y Register. Creado como módulo por que compartirán un servicio en común de authenticación.
    2. Al ver que de momento solo se están tratando con Usuarios y naves, mi idea ha sido generar una interface por cada uno de ellos. Al crear la interface IShips me he dado cuenta de que podía generar una para el tipo de respuesta de SWAPI para la request de Ships.

2. Se ha generado dos funciones en el servicio de Auth para el Login y el Signup. El Login simplemente comprueba las credenciales introducidas con las del listado de simulación de usuarios. Si el proceso es correcto, el servicio se encarga de añadir una key en LocalStorage. El Signup básicamente comprueba si el objeto mandado es del tipo/estructura que queremos guardar y lo intenta añadir al array de usuarios del listado. Si el proceso funciona y no da error , el servicio añade (como el Login) la misma key generada. Para que no se pueda acceder a la pagina /ships he añadido un Guard para que comprueba si está loggeado el usuario para poder acceder. En caso de que el usuario no esté loggeado ( no tenga la key en el LocalStorage) se le redirigirá a la página de Login.

4. Adaptación de de la cantidad de naves que se estaban mostrando con la de la API. Realizar llamada a la página que se solicita aprovechando que el componente 'pagination-controls' nos devuelve la página deseada en  la variable de 'event'. Y he creado un servicio a parte del existente para que la API nos devuelva la página que deseamos.

6. Cambiar manera de generar la url, recuperando el Id de la nave de la url que se le pasa por parámetro a la función getStarshipId(). Se ha añadido la variable urlBaseImg para concatenarla con el Id de la nave recuperado.

7. A nivel código no está mal del todo. Quizás intentaría no usar variables del tipo var e intentar usar mas let y const por tema acceso a memoria. Otra mejora que se podría hacer es no utilizar funciones por ejemplo para el añadido de elementos a un array , .push() por ejemplo, y trabajar con la destructuración ya que es bastante más rápido.

    1. Para la no saturación de los servidores, se podría crear un balanceo de las peticiones a los servidores para que estén equilibradas a la par en numero de peticiones. Intentaría llevar un control del estado de las máquinas diario a nivel de uso de RAM , CPU ,... (yo por ejemplo uso Grafana) por si hubiese que estar atentos de cualquier error.