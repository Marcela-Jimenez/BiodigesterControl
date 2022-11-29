
namespace Backend.Models.SignalR
{
    public interface IHubClient
    {
        Task getReads(ReadBiodigester read);
    }
}
