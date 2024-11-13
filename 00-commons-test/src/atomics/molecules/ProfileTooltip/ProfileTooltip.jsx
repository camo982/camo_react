import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Tooltip, Avatar, Button, tooltipClasses } from '@mui/material';
import styles from './ProfileTooltip.module.scss';

const ProfileTooltip = ({ profileInfo,children }) => {
  const { name, lastName, email, domains, subdomains,urlTyC } = profileInfo;
  const initials = `${name[0]}${lastName[0]}`;

  return (
    <div>
      <LightTooltip
        //open={true}
        title={
          <div className={styles.profileTooltipContent}>
            <p className={styles.email}>{email}</p>
            <Avatar className={styles.avatar}>{initials}</Avatar>
            <p className={styles.greeting}>
              ¡Hola, {name.split(' ')[0]}!
            </p>
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <p className={styles.number}>{domains}</p>
                <p className={styles.label}>Dominios</p>
              </div>
              <div className={styles.infoItem}>
                <p className={styles.number}>{subdomains}</p>
                <p className={styles.label}>Subdominios</p>
              </div>
            </div>
            <Button variant="outlined" className={styles.logoutButton}>
              Cerrar sesión
            </Button>
            <a href={urlTyC} className={styles.terms}>Términos y condiciones</a>
          </div>
        }
        placement="bottom-start"
        arrow
      >
         {children}
      </LightTooltip>
    </div>
  );
};

ProfileTooltip.propTypes = {
  profileInfo: PropTypes.shape({
    name: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    domains: PropTypes.string,
    subdomains: PropTypes.string,
    urlTyC: PropTypes.string,
  }),
  children: PropTypes.element.isRequired,
};

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white
  },
  [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.text.primary,
      borderRadius: '4px',
      boxShadow: '0px 6px 12px 0px rgba(21, 21, 21, 0.12)',
      padding:'0px'
  }
}));

export default ProfileTooltip;