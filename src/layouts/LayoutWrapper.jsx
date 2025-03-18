const LayoutWrapper = ({ Layout, Component }) => {
    return (
        <Layout>
            <Component />
        </Layout>
    );
};

export default LayoutWrapper;