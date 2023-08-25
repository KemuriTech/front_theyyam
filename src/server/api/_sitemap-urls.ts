export default cachedEventHandler(
  async (e) => {
    const config = useRuntimeConfig();
    const fetchRoutes = async (endpoint) => {
      const routes = [];
      await fetch(`${config.public.LANDING_PAGE_URL}/${config.public.KUROCO_API_PREFIX}/${config.public.KUROCO_API_VER}/${endpoint}`, {
        method: 'GET',
      }).then(response => response.json())
        .then(res => {
          res.list.forEach((list) => {
            return routes.push({
              loc:`/events/${list.slug}`,
              lastmod: new Date(list.update_ymdhi).toISOString(),
            });
          })
        });
      return routes;
    }

    return [...(await fetchRoutes('events'))]
  },
  {
    name: 'sitemap-dynamic-url',
    maxAge: 60 * 60 * 24, // cache URLs for 24 hours
  }
);
