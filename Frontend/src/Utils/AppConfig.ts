class AppConfig {
    public vacationsUrl = "http://localhost:4000/api/vacations/";
    public followedUrl = "http://localhost:4000/api/followed-vacations/";
    public registerUrl = "http://localhost:4000/api/register/"
    public loginUrl = "http://localhost:4000/api/login/"
}

const appConfig = new AppConfig();

export default appConfig;
