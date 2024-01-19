# Full stack Application
This is a full-stack web application that allows users to give language based quiz. This app inclued interactive and user-friendly UI for the
quiz.
**Gathering and refactoring data was a tough process hence test is available in only Hindi, English, Spanish, Italian langauge.**
**The mock data for the questions can be found in server/data/data.json.**

**Demo credential:**
   -**Email: sm@gmail.com**
   -**Password: Sam1222@**

## The application has the following functionalities:
- **Authentication: User will be able to login and singup using credentials. Strong password required of minimum 6 length, one lowercase, uppercase, number and special char. Invalid email will not be accepted.**

- **Quiz: User can select a langage based upon that he will be redirected to test page. One question at a time will be given. Progress of the test will be indicated through Progress bar. If someone leave the test from mid he will not get any score.**
- **Performance: Performance tab will have information regarding performance in all the test. Interective UI to show performance in each excercise of each leanguage**
- **LeaderBoard: Leader board tab will have information regarding top-performing users in specific language.**
- **Profile: Profile tab will have information the user and button to reset their progress if they want to start over.**

## Installation
1. Clone the project repository to your local machine:
   ```bash
   git clone https://github.com/absiemon/language-quiz.git
   ```
2. Naviagte to the client and server one by one and download the required node packages using the npm install command:

```bash
$ npm install
```
3. Create a .env file in the server directory of the application and add the following variables:
```bash
MONGO_URL= your mongoDB url
JWT_SECRET = your jwt secret
```
4. Start the backend by executing this command:
```bash
$ npm run dev
```
5. Start the frontend by executing this command:
```bash
$ npm run dev
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)


