
export class ApiClient{
    public static async getBands():Promise<any>{
        const response = await fetch("http://localhost:8080/bands");
        return await response.json();
    }
}