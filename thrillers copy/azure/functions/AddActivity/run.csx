#r "Newtonsoft.Json"

using System.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;

public static IActionResult Run(HttpRequest req, out object activityDocument, ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");

    string employeeId = req.Query["employeeId"];
    string activityType = req.Query["activityType"];
    string documentId = req.Query["documentId"];

    if (!string.IsNullOrEmpty(employeeId) && !string.IsNullOrEmpty(activityType))
    {
        activityDocument = new
        {
            employeeId,
            activityType,
            documentId
        };

        return (ActionResult)new OkResult();
    }
    else
    {
        activityDocument = null;
        return (ActionResult)new BadRequestResult();
    }
}
