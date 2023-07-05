<div style="display: flex; align-items: center; justify-content: center; width:100%; background:#121212; border-radius: 10px;">
<img src="./assets/full-logo.svg" />
</div>

<center>
<h4 style="margin-top: 25px;">
 <strong>The best way to store and share knowledge about combos in fighting games</strong>
</h4>
</center>

---

<h4 style="margin-top: 35px;">Languages and Tools</h4>

<ul>
    <li>Typescript</li>
    <li>Java</li>
    <li>Spring Boot</li>
    <li>PostgreSQL</li>
    <li>ReactJS</li>
    <li>NextJS</li>
</ul>

#### How to run locally

<p><strong>1. Clone the repo</strong></p>

<p>
<strong>2. Frontend setup:</strong>

You have to create an .env file at the <code>./frontend</code> directory, with the following variables: 
> GOOGLE_CLIENT_ID=YOUR_CLIENT_ID_IF_YOU_WANT_GOOGLE_LOGIN <br/> 
> GOOGLE_CLIENT_SECRET=YOUR_CLIENT_SECRET_IF_YOU_WANT_GOOGLE_LOGIN <br/> 
> NEXTAUTH_URL=http://localhost:3000 //leave it default 

then: 


<code>cd frontend && yarn && yarn dev</code>

</p>

<p>
<strong>3. Backend setup:</strong>

Required Tools: 
>Java 17 and PostgreSQL 13 or higher

You have to create an .env file at the <code>./backend/src/main/resources</code> directory, with the following variables: 
> TOKEN_SECRET=YOUR_RANDOM_TOKEN_SECRET <br/> 
TOKEN_EXPIRATION_MSEC=00000 <br/> 
REFRESH_TOKEN_EXPIRATION_MSEC=00000 <br/> 
SECURE_KEY=YOUR_SECURE_VALUE <br/>
POSTGRESQL_CONNECTION=YOUR_POSTGRES_CONNECTION <br/>
POSTGRESQL_USERNAME=postgres_username <br/>
POSTGRESQL_PASSWORD=postgres_password <br/>
MAIL_SENDER_MAIL_USERNAME=cool_email <br/>
MAIL_SENDER_MAIL_PASSWORD=cool_password_email <br/>
BASE_EMAIL_VERIFICATION_FRONTEND_URL=http://localhost:3000/email-verification <br/>
BASE_PASSWORD_CHANGE_FRONTEND_URL=http://localhost:3000/password-change <br/>
</p>


