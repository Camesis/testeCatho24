import React from 'react';

import { AppBar, Toolbar, Typography } from '@mui/material';

import Link from 'next/link';

const Header: React.FC = () => (
    <AppBar position="static" className="bg-blue-500 p-4">
        <Toolbar  className="container mx-auto flex items-center justify-between">
            <Link href="/register">
                <Typography variant="h6">Cadastrar</Typography>               
            </Link>
            <Link href="/search">
                <Typography variant="h6">Buscar Candidato</Typography>               
            </Link>
        </Toolbar>
    </AppBar>
);

export default Header;