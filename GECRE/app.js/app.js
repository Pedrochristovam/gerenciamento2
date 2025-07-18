
        // Variáveis globais para controle
        let fieldCounter = 5;
        let searchResults = [];
        let fieldIds = [1, 2, 3, 4, 5]; // Array para controlar IDs dos campos

        // Sistema de tabs
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.getAttribute('data-tab');
                
                // Remove active das tabs
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Ativa tab atual
                button.classList.add('active');
                document.getElementById(tabName).classList.add('active');
            });
        });

        // Função para adicionar novos campos dinamicamente
        function addField() {
            fieldCounter++;
            const fieldsGrid = document.getElementById('implementFields');
            
            const fieldGroup = document.createElement('div');
            fieldGroup.className = 'field-group';
            fieldGroup.setAttribute('data-field-id', fieldCounter);
            fieldGroup.innerHTML = `
                <div class="field-header">
                    <input type="text" class="field-name-input" value="Nome do Campo ${fieldCounter}" placeholder="Nome do campo...">
                    <button type="button" class="remove-field-btn" onclick="removeField(${fieldCounter})" title="Remover campo">×</button>
                </div>
                <input type="text" id="impl${fieldCounter}" name="impl${fieldCounter}" placeholder="Digite o valor...">
            `;
            
            fieldsGrid.appendChild(fieldGroup);
            fieldIds.push(fieldCounter);
            
            // Animação suave
            fieldGroup.style.opacity = '0';
            fieldGroup.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                fieldGroup.style.transition = 'all 0.3s ease';
                fieldGroup.style.opacity = '1';
                fieldGroup.style.transform = 'translateY(0)';
            }, 10);
        }

        // Função para remover campos
        function removeField(fieldId) {
            const fieldGroup = document.querySelector(`[data-field-id="${fieldId}"]`);
            if (fieldGroup) {
                // Animação de saída
                fieldGroup.style.transition = 'all 0.3s ease';
                fieldGroup.style.opacity = '0';
                fieldGroup.style.transform = 'translateY(-10px)';
                
                setTimeout(() => {
                    fieldGroup.remove();
                    // Remove o ID do array
                    fieldIds = fieldIds.filter(id => id !== fieldId);
                }, 300);
            }
        }

        // Função para obter dados dos campos personalizados
        function getFieldsData() {
            const fieldsData = {};
            const fieldGroups = document.querySelectorAll('#implementFields .field-group');
            
            fieldGroups.forEach(group => {
                const fieldId = group.getAttribute('data-field-id');
                const fieldNameInput = group.querySelector('.field-name-input');
                const fieldValueInput = group.querySelector('input[type="text"]:not(.field-name-input)');
                
                if (fieldNameInput && fieldValueInput) {
                    const fieldName = fieldNameInput.value.trim() || `Campo ${fieldId}`;
                    const fieldValue = fieldValueInput.value.trim();
                    
                    fieldsData[fieldName] = fieldValue;
                }
            });
            
            return fieldsData;
        }

        // Handler do formulário de busca
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simula busca (aqui você integraria com o backend)
            const formData = new FormData(this);
            const searchData = Object.fromEntries(formData);
            
            // Simula dados de retorno
            searchResults = [
                {
                    campo1: searchData.search1 || 'Exemplo 1',
                    campo2: searchData.search2 || 'Dados 1',
                    campo3: searchData.search3 || 'Info 1',
                    campo4: searchData.search4 || 'Valor 1',
                    campo5: searchData.search5 || 'Item 1'
                },
                {
                    campo1: 'Exemplo 2',
                    campo2: 'Dados 2',
                    campo3: 'Info 2',
                    campo4: 'Valor 2',
                    campo5: 'Item 2'
                }
            ];
            
            displayResults();
        });

        // Função para exibir resultados
        function displayResults() {
            const resultsArea = document.getElementById('resultsArea');
            const tableBody = document.getElementById('resultsTableBody');
            
            tableBody.innerHTML = '';
            
            searchResults.forEach((result, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${result.campo1}</td>
                    <td>${result.campo2}</td>
                    <td>${result.campo3}</td>
                    <td>${result.campo4}</td>
                    <td>${result.campo5}</td>
                    <td>
                        <button class="btn btn-outline" style="padding: 6px 12px; font-size: 0.9rem;" onclick="editRow(${index})">
                            Editar
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
            
            resultsArea.classList.add('show');
        }

        // Handler do formulário de implementação
        document.getElementById('implementForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtém dados dos campos personalizados
            const implementData = getFieldsData();
            
            // Simula gravação no backend
            console.log('Dados para gravar:', implementData);
            
            // Feedback visual
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="icon-save"></span> Gravando...';
            submitBtn.classList.add('loading');
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span class="icon-save"></span> Gravado com sucesso!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.classList.remove('loading');
                    submitBtn.style.background = '';
                    
                    // Limpa apenas os valores, mantém os nomes dos campos
                    const valueInputs = document.querySelectorAll('#implementFields input[type="text"]:not(.field-name-input)');
                    valueInputs.forEach(input => input.value = '');
                }, 2000);
            }, 1500);
        });

        // Função para exportar para Excel
        function exportToExcel() {
            if (searchResults.length === 0) {
                alert('Nenhum resultado para exportar. Faça uma busca primeiro.');
                return;
            }
            
            // Aqui você integraria com uma biblioteca de Excel ou enviaria para o backend
            console.log('Exportando para Excel:', searchResults);
            alert('Funcionalidade de exportação será implementada na integração com o backend.');
        }

        // Função para editar linha (placeholder)
        function editRow(index) {
            console.log('Editando linha:', index, searchResults[index]);
            alert('Funcionalidade de edição será implementada na integração com o backend.');
        }

        // Animação de entrada
        document.addEventListener('DOMContentLoaded', function() {
            const container = document.querySelector('.main-container');
            container.style.opacity = '0';
            container.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                container.style.transition = 'all 0.6s ease';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
            }, 100);
        });
   