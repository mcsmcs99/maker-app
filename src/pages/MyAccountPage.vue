<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Minha Conta</div>
      </q-card-section>
      <q-separator />

      <!-- Informações do Usuário -->
      <q-card-section>
        <template v-if="userRole === 'cliente'">
          <q-avatar size="100px" :src="user.photo" />
          <div class="q-mt-md">
            <div><strong>Nome:</strong> {{ user.name }}</div>
            <div><strong>Email:</strong> {{ user.email }}</div>
            <div><strong>WhatsApp:</strong> {{ user.whatsapp }}</div>
          </div>
          <q-btn label="Editar Perfil" color="primary" class="q-mt-md" @click="editProfile" />
          <q-toggle v-model="notifications" label="Ativar notificações de agendamentos" class="q-mt-md" />
          <q-btn label="Histórico de Agendamentos" flat @click="viewHistory" />
        </template>

        <template v-else-if="userRole === 'empresario'">
          <q-avatar size="100px" :src="company.logo" />
          <div class="q-mt-md">
            <div><strong>Empresa:</strong> {{ company.name }}</div>
            <div><strong>CNPJ:</strong> {{ company.cnpj }}</div>
            <div><strong>Telefone:</strong> {{ company.phone }}</div>
          </div>
          <q-btn label="Editar Perfil da Empresa" color="primary" class="q-mt-md" @click="editCompanyProfile" />
          <q-btn label="Horários de Funcionamento" flat @click="configureHours" />
          <q-btn label="Relatórios Financeiros" flat @click="viewReports" />
        </template>

        <template v-else-if="userRole === 'funcionario'">
          <div class="q-mt-md">
            <div><strong>Nome:</strong> {{ user.name }}</div>
            <div v-for="empresa in user.companies" :key="empresa.id" class="q-mt-sm">
              <div><strong>Empresa:</strong> {{ empresa.name }}</div>
              <div><strong>Cargo:</strong> {{ empresa.role }}</div>
              <div><strong>Escala:</strong> {{ empresa.schedule }}</div>
            </div>
          </div>
          <q-btn label="Visualizar Agenda" flat @click="viewSchedule" />
          <q-btn label="Confirmar/Cancelar Agendamentos" flat @click="manageAppointments" />
        </template>
      </q-card-section>

      <q-separator />

      <!-- Funcionalidades Comuns -->
      <q-card-section>
        <q-btn label="Trocar Senha" color="secondary" @click="changePassword" />
        <q-btn label="Sair" color="negative" flat @click="logout" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const userRole = ref('funcionario'); // Pode ser 'cliente', 'empresario' ou 'funcionario'
const notifications = ref(true);

const user = ref({
  name: 'João Silva',
  email: 'joao@email.com',
  whatsapp: '(11) 91234-5678',
  photo: 'https://cdn.quasar.dev/img/avatar.png',
  companies: [
    { id: 1, name: 'Barbearia XYZ', role: 'Cabeleireiro', schedule: 'Seg-Sex: 09h - 18h' }
  ]
});

const company = ref({
  name: 'Barbearia XYZ',
  cnpj: '12.345.678/0001-99',
  phone: '(11) 98765-4321',
  logo: 'https://cdn.quasar.dev/img/logo.png'
});

function editProfile() {
  $q.notify({ type: 'info', message: 'Editar perfil do usuário.' });
}

function viewHistory() {
  $q.notify({ type: 'info', message: 'Visualizar histórico de agendamentos.' });
}

function editCompanyProfile() {
  $q.notify({ type: 'info', message: 'Editar perfil da empresa.' });
}

function configureHours() {
  $q.notify({ type: 'info', message: 'Configurar horários de funcionamento.' });
}

function viewReports() {
  $q.notify({ type: 'info', message: 'Visualizar relatórios financeiros.' });
}

function viewSchedule() {
  $q.notify({ type: 'info', message: 'Visualizar agenda.' });
}

function manageAppointments() {
  $q.notify({ type: 'info', message: 'Gerenciar agendamentos.' });
}

function changePassword() {
  $q.notify({ type: 'info', message: 'Trocar senha.' });
}

function logout() {
  $q.notify({ type: 'negative', message: 'Você saiu da conta.' });
}
</script>

<style scoped>
.q-avatar {
  border: 2px solid #ccc;
}
</style>