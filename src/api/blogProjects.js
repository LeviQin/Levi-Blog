import request from '@/utils/request';

export const getBlogProjects = (featured = false) => request({
  method: 'get',
  url: `/api/blog-projects/projects${featured ? '?featured=1' : ''}`,
});
