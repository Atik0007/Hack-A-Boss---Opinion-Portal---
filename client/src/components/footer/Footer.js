import './Footer.scss';

export const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()}, Right reserved.</p>
        </footer>
    );
};
