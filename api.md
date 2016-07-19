**Webinars**
----
Return JSON data about scheduled No Sad Panda Initiative webinars.

**/webinars**

* **Method:**

  `GET`

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:** <br />
    `{ title: 'Another sad panda discovered',` <br />
        `starts: '2016-07-23T15:30:00.000Z',` <br />
        `_id: '36d43740-4c9e-11e6-8355-5f6b2afac57d' }`

* **Error Response:**

  None

**/webinars**

* **Method:**

  `POST`

*  **URL Params**

   None

* **Data Params**

   **Required:**

   `id=[guid]`

   `title=[string]`

   `starts=[datetime]`

* **Success Response:**

  * **Code:** 200 OK<br />
    **Content:** <br />
    `{ title: 'Another sad panda discovered',` <br />
        `starts: '2016-07-23T15:30:00.000Z',` <br />
        `_id: '36d43740-4c9e-11e6-8355-5f6b2afac57d' }`

* **Error Response:**

  * **Code:** 400 BAD REQUEST

**/webinars**

* **Method:**

  `PATCH`

*  **URL Params**

   `id=[integer`]

* **Data Params**

   **Optional:**

   `title=[string]`

   `starts=[datetime]`

* **Success Response:**

  * **Code:** 204

* **Error Response:**

  * **Code:** 400 BAD REQUEST

**/webinars**

* **Method:**

  `DELETE`

*  **URL Params**

   `id=[integer`]

* **Data Params**

   None

* **Success Response:**

  * **Code:** 204 NO CONTENT

* **Error Response:**

  * **Code:** 400 BAD REQUEST
  * **Code:** 404 NOT FOUND
