import Head from 'next/head';
import Header from '../components/Header';
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="home">
            <Head>
                <title>Tavlorify Store - Home</title>
            </Head>
            <Header />
            <div className="page-content">
                <div className="container-fluid">
                    
                </div>
            </div>
            <Footer />
        </div>
    );
}