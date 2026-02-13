import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

export const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
      textAlign="center"
    >
      <Typography variant="h4" color="error" gutterBottom>
        Algo salió mal
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        {error?.message ??
          'Ha ocurrido un error inesperado al cargar la aplicación.'}
      </Typography>
      {resetErrorBoundary && (
        <Button variant="contained" onClick={resetErrorBoundary}>
          Intentar de nuevo
        </Button>
      )}
    </Box>
  );
};
