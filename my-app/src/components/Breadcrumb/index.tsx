import { Breadcrumbs, Stack, Typography } from '@mui/material';
import React from 'react';

import { Link } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

const BreadcrumbComp: React.FC<any> = (props) => {
  const {
    navigate,
    location: { pathname },
  } = props.router;

  const pathnames = pathname.split('/').filter((x: string) => x);

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
        sx={{
          padding: '15px 0',
          '& .MuiBreadcrumbs-li': {
            cursor: 'pointer',
            color: '#acacac',
          },
        }}
      >
        {pathnames.length > 0 ? <Link to="/">Trang chủ</Link> : <Typography>Trang chủ</Typography>}

        {pathnames.map((name: string, index: number) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name}>{name}</Typography>
          ) : (
            <Link key={name} to={routeTo} style={{ textDecoration: 'none' }}>
              {name}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
};

export default withRouter(BreadcrumbComp);
