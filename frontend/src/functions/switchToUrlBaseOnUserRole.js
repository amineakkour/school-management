
export function switchToUrlBaseOnUserRole(role) {
  var dashboard_page_url = '';
  var login_page_url = '';
  
  switch(role){
    case 'student': 
      login_page_url = '/connexion/etudiant';
      dashboard_page_url = '/etudiant/tableau-de-bord';
      break;

    case 'teacher': 
      login_page_url = '/connexion/enseignant';
      dashboard_page_url = '/enseignant/tableau-de-bord';
      break;

    case 'admin': 
      login_page_url = '/connexion/adminstrateur';
      dashboard_page_url = '/adminstrateur/tableau-de-bord';
      break;

    default: //if something went wrong go back to student login
      login_page_url = '/connexion/etudiant';
      dashboard_page_url = '/connexion/etudiant';
      break;
  }

  return {loginPage: login_page_url, dashboardPage: dashboard_page_url};
}