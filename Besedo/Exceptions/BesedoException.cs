namespace Besedo.API.Exceptions
{
    public class BesedoException : Exception
    {
        public int StatusCode { get; set; }

        public BesedoException(int statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
