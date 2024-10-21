const { execSync } = require('child_process');
const readline = require('readline');

// Función para verificar si una rama existe
function branchExists(branchName) {
  try {
    execSync(`git rev-parse --verify ${branchName}`);
    return true;
  } catch (error) {
    return false;
  }
}

// Configurar la interfaz de lectura
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Función principal
function updateMasterFromDev() {
  try {
    // Verificar si la rama dev existe
    if (!branchExists('dev')) {
      throw new Error('Branch "dev" does not exist.');
    }

    // Verificar si estamos en la rama master
    const currentBranch = execSync('git branch --show-current').toString().trim();
    if (currentBranch !== 'master') {
      console.log('You are not on the master branch. Switching to master...');
      execSync('git checkout master');
    }

    // Pull the latest changes from origin/master
    console.log('Pulling the latest changes from origin/master...');
    execSync('git pull origin master --no-rebase');

    // Hacer merge de la rama dev en master
    console.log('Merging dev into master...');
    execSync('git merge dev');
    console.log('Branch "dev" merged into master');

    // Push the updated master branch to origin/master
    console.log('Pushing the updated master branch to origin/master...');
    execSync('git push origin master');
    console.log('master branch pushed to origin/master');
  } catch (error) {
    console.error('Error:', error.message);
  }

  rl.close();
}

// Iniciar la actualización de master
updateMasterFromDev();
