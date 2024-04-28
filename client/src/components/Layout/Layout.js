import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { Toaster } from 'react-hot-toast';

function Layout(props) {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="description" content={props.description} />
                <meta name="keywords" content={props.keywords} />
                <meta name="author" content={props.author} />

                <title>{props.title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: "70vh" }}>
                <Toaster />
                {props.children} {/* as we wrap this comp so with this item display in app.js  */}
            </main>
            <Footer />
        </div>
    );
};

Layout.defaultProps = {
    title: 'Crzy Shop - Shop Like Pro',
    description: 'Crzy Shop is a shop of fulfillment',
    keywords: 'Crzy Shop, prodect, shop like pro',
    author: 'Kushagra'
};

export default Layout