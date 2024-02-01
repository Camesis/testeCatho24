import { useState } from 'react';

import { Alert, Box, Container, Grid, Snackbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import AddSkillButton from '../Layout/AddSkillButon';
import { CandidateService } from '@/shared/services/api/candidates/CandidateService';
import Notification from '../Layout/Notification';

const RegisterCandidate: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [skills, setSkills] = useState<string[]>(['']);
    const [message, setMessage] = useState<string | null>(null);
    const [type, setType] = useState<'error' | 'success'>('success');    
    const [openAlert, setOpenAlert] = useState<boolean>(false);
    

    const handleAddSkill = () => {
        setSkills([...skills, '']);
    };

    const handleChangeSkill = (index: number, value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const handleCreateCandidate = () => {
        const candidateData = {
            name: name,
            skills: skills,
        }
        CandidateService.create(candidateData).then((result) => {
            if (result instanceof Error) {
                setMessage(result.message);
                setOpenAlert(true);
                setType('error');
                
            } else {
                setName('');
                setSkills(['']);
                setMessage('Candidato cadastrado com sucesso!'); 
                setOpenAlert(true);
                setType('success');      
            }
        })
    };

    return (
        <Container maxWidth="sm">
            <Box m={2} p={4} border="1px solid #ddd" borderRadius={4}>
                <h1 className="text-2xl mb-4">Cadastro de Candidato</h1>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                />

                <h3 className="text-lg mt-4 mb-2">Skills</h3>
                {skills.map((skill, index) => (
                    <Grid container spacing={2} key={index} alignItems="center">
                        <Grid item xs={10}>
                            <TextField
                                label="Skill"
                                value={skill}
                                onChange={(e) => handleChangeSkill(index, e.target.value)}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>
                        {index === skills.length - 1 && (
                            <Grid item xs={2}>
                                <AddSkillButton onClick={handleAddSkill} />
                                
                            </Grid>
                        )}
                    </Grid>
                ))}

                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleCreateCandidate}
                    className="bg-blue-500 mt-4"                
                >
                    Cadastrar
                </Button>
            </Box>

            {message && (
                <Notification
                    message={message}
                    type={type}
                    onClose={() => {
                        setMessage(null);
                        setOpenAlert(false);
                        setType('success');
                    }}
                    />
            )}
        </Container>
        
    );
};

export default RegisterCandidate;
