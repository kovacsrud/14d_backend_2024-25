using KutyaAPI.mvc.model;
using Microsoft.EntityFrameworkCore;

namespace KutyaAPI.mvc.modelview
{
    public class KutyaModelData
    {
        public KutyakGoodUniqueContext context;
        public List<Kutyanevek> Kutyanevek { get; set; }

        public KutyaModelData()
        {
            context = new KutyakGoodUniqueContext();
            context.Kutyaneveks.Load();
            context.Kutyafajtaks.Load();
            context.Kutyas.Load();
            Kutyanevek = context.Kutyaneveks.Local.ToList();
        }
    }
}
