<div style="display: flex; align-items: center; justify-content: center; width:100%; background:#121212; border-radius: 10px;">
<img src="./assets/full-logo.svg" />
</div>

<h4 style="margin-top: 25px; text-align: center; align:center;">
 <strong>The best way to store and share knowledge about combos in fighting games</strong>
</h4>

---

<h4 style="margin-top: 35px;">Languages and Tools</h4>

<ul>
    <li>Typescript</li>
    <li>Java</li>
    <li>Spring Boot</li>
    <li>ReactJS</li>
    <li>NextJS</li>
</ul>

#### How to run locally

<p><strong>1.</strong> Clone the repo</p>

<p>
<strong>Frontend setup:</strong>

You have to create an .env file at the <code>./frontend</code> directory, with the following variables: 
> GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_IF_YOU_WANT_GOOGLE_LOGIN
GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_IF_YOU_WANT_GOOGLE_LOGIN
NEXTAUTH_URL=http://localhost:3000 //leave it default 

then: 

<code>
    cd frontend &&
    yarn && yarn dev
</code>

</p>

<p>
<strong>Backend setup:</strong>

Required Tools: 
>Java 17 and Postgres 13 or higher

You have to create an .env file at the <code>./backend/src/main/resources</code> directory, with the following variables: 
> TOKEN_SECRET=YOUR_RANDOM_TOKEN_SECRET
TOKEN_EXPIRATION_MSEC=00000
REFRESH_TOKEN_EXPIRATION_MSEC=00000
SECURE_KEY=YOUR_SECURE_VALUE
POSTGRESQL_CONNECTION=YOUR_POSTGRES_CONNECTION
POSTGRESQL_USERNAME=postgres_username
POSTGRESQL_PASSWORD=postgres_password
MAIL_SENDER_MAIL_USERNAME=cool_email
MAIL_SENDER_MAIL_PASSWORD=cool_password_email
BASE_EMAIL_VERIFICATION_FRONTEND_URL=http://localhost:3000/email-verification
BASE_PASSWORD_CHANGE_FRONTEND_URL=http://localhost:3000/password-change
</p>


