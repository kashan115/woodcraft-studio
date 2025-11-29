import { WoodworkEditor } from '@/components/woodwork/WoodworkEditor';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>WoodCraft Studio - Free Open Source Woodworking Project Planner</title>
        <meta name="description" content="Design furniture and woodworking projects with our free 3D planner. Drag and drop lumber pieces, generate cut lists, and plan your builds like a pro." />
        <meta name="keywords" content="woodworking, furniture design, 3D planner, cut list, DIY, lumber calculator, project planner" />
      </Helmet>
      <WoodworkEditor />
    </>
  );
};

export default Index;
