using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<List<Activity>>{}
    
    public class Handler(AppDbContext context) : IRequestHandler<Query, List<Activity>>
    {
        public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            //Commented the area where cancellation token functionality was tested by artificial delays.
            /*try
            {
                for (int i = 1; i <= 10; i++)
                {
                    cancellationToken.ThrowIfCancellationRequested();
                    await Task.Delay(1000,cancellationToken);
                    logger.LogInformation($"Task {i} completed");
                }
            }
            catch (Exception e)
            {
                logger.LogInformation("Task Cancelled");
            }*/
            return await context.Activities.ToListAsync(cancellationToken);
        }
    }
}