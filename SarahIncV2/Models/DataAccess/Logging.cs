using NLog;

namespace SarahIncV2.Models
{
    public static class Logging
    {
        private static readonly Logger Logger = LogManager.GetCurrentClassLogger();

        public static void LogError(string msg, string method, string varList)
        {
            var error = new LogEventInfo(LogLevel.Error, "", msg);
            error.Properties["method"] = method;
            error.Properties["varList"] = varList;
            Logger.Log(error);
        }
    }
}
