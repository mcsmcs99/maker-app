<template>
  <q-page class="flex flex-center">
    <div class="q-pa-lg">
      <div class="row q-col-gutter-md">
        <!-- Opção 1: Consumidor -->
        <q-card 
          class="col-6" 
          @click="selectOption(0)" 
          bordered 
          flat>
          <q-card-section class="text-center">
            <q-icon name="person" size="48px" color="blue" />
            <div class="q-mt-md">Cadastrar como Consumidor</div>
          </q-card-section>
        </q-card>

        <!-- Opção 2: Empresário -->
        <q-card 
          class="col-6" 
          @click="selectOption(1)" 
          bordered 
          flat>
          <q-card-section class="text-center">
            <q-icon name="business" size="48px" color="green" />
            <div class="q-mt-md">Cadastrar como Empresário</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Formulário Dinâmico -->
      <div>
        <q-card class="q-mt-lg" flat bordered>
          <q-card-section>
            <div class="text-h6">{{ formTitle }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-form @submit="submitForm">
              <!-- Campos básicos -->
              <q-input filled v-model="formData.name" label="Nome" />
              <q-input filled v-model="formData.email" label="E-mail" />

              <!-- Campos específicos para Empresário -->
              <template v-if="formData.type === 1">
                <q-input filled v-model="formData.company" label="Nome da Empresa" />
                <!-- Select para Segmentos -->
                <q-select
                  v-model="formData.segment_id"
                  :options="segments"
                  label="Segmento"
                  emit-value
                  map-options
                  outlined
                />

                <!-- Select para Subsegmentos -->
                <q-select
                  v-model="formData.sub_segment_id"
                  :options="filteredSubSegments"
                  label="Área de atuação"
                  emit-value
                  map-options
                  outlined
                  :disable="!formData.segment_id"
                />
              </template>
              <!-- Campo de Senha -->
              <q-input
                v-model="formData.password"
                label="Senha"
                outlined
                :type="showPassword ? 'text' : 'password'"
                :rules="[validatePassword]"
                clearable
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </template>
              </q-input>
            
              <!-- Campo de Confirmação de Senha -->
              <q-input
                v-model="formData.confirmPassword"
                label="Confirmar Senha"
                outlined
                :type="showPassword ? 'text' : 'password'"
                :rules="[validateConfirmPassword]"
                clearable
              >
                <template v-slot:append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="togglePasswordVisibility"
                  />
                </template>
              </q-input>
              <q-btn type="submit" label="Cadastrar" color="primary" class="q-mt-md" />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useGotoRouter } from 'src/utils/goToRouter'

const authStore = useAuthStore()
const { handleGotoLogin } = useGotoRouter()

const segments = ref([
  { value: 1, label: 'Beleza e bem-estar' },
  { value: 2, label: 'Educação e treinamento' },
  { value: 3, label: 'Esporte e lazer' },
  { value: 4, label: 'Eventos' },
  { value: 5, label: 'Saúde' },
  { value: 6, label: 'Serviços automotivos' },
  { value: 7, label: 'Serviços profissionais' },
  { value: 8, label: 'Serviços residenciais' },
  { value: 9, label: 'Outros' },
])

const subSegments = ref([

  { segmentId: 1, value: 1, label: 'Barbearias' },
  { segmentId: 1, value: 2, label: 'Salões de beleza' },
  { segmentId: 1, value: 3, label: 'Spas' },
  { segmentId: 1, value: 4, label: 'Clínicas de estética' },
  { segmentId: 1, value: 5, label: 'Manicure e pedicure' },
  { segmentId: 1, value: 6, label: 'Massoterapia' },
  { segmentId: 1, value: 7, label: 'Outros' },

  { segmentId: 2, value: 8, label: 'Aulas particulares' },
  { segmentId: 2, value: 9, label: 'Escolas de dança' },
  { segmentId: 2, value: 10, label: 'Workshops e treinamentos' },
  { segmentId: 2, value: 11, label: 'Outros' },

  { segmentId: 3, value: 12, label: 'Estúdios de fotografia' },
  { segmentId: 3, value: 13, label: 'Estúdios de ioga e pilates' },
  { segmentId: 3, value: 14, label: 'Campos de futebol ou quadras esportivas' },
  { segmentId: 3, value: 15, label: 'Personal trainers' },
  { segmentId: 3, value: 16, label: 'Outros' },

  { segmentId: 4, value: 17, label: 'Buffets' },
  { segmentId: 4, value: 18, label: 'Locação de espaços para eventos' },
  { segmentId: 4, value: 19, label: 'DJs e bandas' },
  { segmentId: 4, value: 20, label: 'Organização de festas e eventos' },
  { segmentId: 4, value: 21, label: 'Outros' },

  { segmentId: 5, value: 22, label: 'Clínicas médicas (geral e especialidades)' },
  { segmentId: 5, value: 23, label: 'Clínicas odontológicas' },
  { segmentId: 5, value: 24, label: 'Clínicas de fisioterapia' },
  { segmentId: 5, value: 25, label: 'Psicólogos e terapeutas' },
  { segmentId: 5, value: 26, label: 'Nutricionistas' },
  { segmentId: 5, value: 27, label: 'Clínicas veterinárias' },
  { segmentId: 5, value: 28, label: 'Outros' },

  { segmentId: 6, value: 29, label: 'Alinhamento e balanceamento' },
  { segmentId: 6, value: 30, label: 'Estéticas automotivas' },
  { segmentId: 6, value: 31, label: 'Instalação de acessórios (som, películas, etc.)' },
  { segmentId: 6, value: 32, label: 'Lava-jatos' },
  { segmentId: 6, value: 33, label: 'Oficinas mecânicas' },
  { segmentId: 6, value: 34, label: 'Outros' },

  { segmentId: 7, value: 35, label: 'Agências de viagens' },
  { segmentId: 7, value: 36, label: 'Corretores de imóveis' },
  { segmentId: 7, value: 37, label: 'Contadores' },
  { segmentId: 7, value: 38, label: 'Consultorias (negócios, marketing, tecnologia, etc.)' },
  { segmentId: 7, value: 39, label: 'Escritórios de advocacia' },
  { segmentId: 7, value: 40, label: 'Outros' },

  { segmentId: 8, value: 41, label: 'Designers de interiores' },
  { segmentId: 8, value: 42, label: 'Eletricistas' },
  { segmentId: 8, value: 43, label: 'Encanadores' },
  { segmentId: 8, value: 44, label: 'Jardineiros' },
  { segmentId: 8, value: 45, label: 'Pedreiros' },
  { segmentId: 8, value: 46, label: 'Pintores' },
  { segmentId: 8, value: 47, label: 'Outros' },

  { segmentId: 9, value: 48, label: 'Agências de modelos' },
  { segmentId: 9, value: 49, label: 'Cartórios (agendamento de serviços específicos)' },
  { segmentId: 9, value: 50, label: 'Estúdios de tatuagem e piercing' },
  { segmentId: 9, value: 51, label: 'Pet shops (banho e tosa)' },
  { segmentId: 9, value: 52, label: 'Outros' }
])

const showPassword = ref(false);
const formData = ref({
  name: '',
  email: '',
  company: '',
  password: '',
  confirmPassword: '',
  segment_id: '',
  sub_segment_id: '',
  type: 0,
});

const formTitle = computed(() => 
formData.value.type === 0
    ? 'Cadastro como Consumidor'
    : 'Cadastro como Empresário'
);

const filteredSubSegments = computed(() => {
  return subSegments.value.filter(
    (subSegment) => subSegment.segmentId === parseInt(formData.value.segment_id)
  );
});

const selectOption = (option) => {
  formData.value.type = option;
};

// Regras de validação
const validatePassword = (val) => {
  const lengthRule = val?.length >= 8 || "A senha deve ter pelo menos 8 caracteres.";
  const uppercaseRule =
    /[A-Z]/.test(val) || "A senha deve ter pelo menos uma letra maiúscula.";
  const lowercaseRule =
    /[a-z]/.test(val) || "A senha deve ter pelo menos uma letra minúscula.";
  const numberRule = /\d/.test(val) || "A senha deve ter pelo menos um número.";
  const specialCharRule =
    /[!@#$%^&*(),.?":{}|<>]/.test(val) || "A senha deve ter pelo menos um caractere especial.";

  // Retornar a primeira regra que falhou ou true
  return lengthRule === true &&
    uppercaseRule === true &&
    lowercaseRule === true &&
    numberRule === true &&
    specialCharRule === true
    ? true
    : lengthRule || uppercaseRule || lowercaseRule || numberRule || specialCharRule;
};

const validateConfirmPassword = (val) =>
  val === formData.value.password || "As senhas não coincidem.";

// Alternar visibilidade da senha
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

// Validação do formulário
const isFormValid = computed(() => {
  return (
    validatePassword(formData.value.password) === true &&
    validateConfirmPassword(formData.value.confirmPassword) === true
  );
});

// Enviar formulário
const submitForm = async () => {
  if (isFormValid.value) {
    console.log('Form data:', formData.value);
    const resp = await authStore.register(formData.value)
    if (resp.code === 200) {
      handleGotoLogin()
    } else {
      alert("Ocorreu um problema ao cadastrar o usuário");
    }
  } else {
    alert("Por favor, corrija os erros antes de enviar.");
  }
};
</script>