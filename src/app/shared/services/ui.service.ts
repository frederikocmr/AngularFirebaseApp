import { Subject } from 'rxjs/Subject';
import { MessagesIndex } from '../interfaces/messages-index.interface';

export class UIService {
    loadingStateChanged = new Subject<boolean>();
    errorMsgStateChanged = new Subject<any>();

    params = {
        'invalid-argument': 'Erro: Um argumento inválido foi fornecido. Tente novamente!',
        'invalid-disabled-field': 'Erro: O valor fornecido para a propriedade de usuário é inválido.',
        'invalid-display-name': 'Erro: O valor fornecido para a propriedade NOME é inválido.',
        'invalid-email-verified': 'Erro: O valor fornecido para a propriedade EMAIL VERIFICADO é inválido.',
        'invalid-email': 'Erro: O valor fornecido para a propriedade EMAIL é inválido.',
        'invalid-password': 'Erro: O valor fornecido para a propriedade SENHA é inválido.',
        'invalid-phone-number': 'Erro: O valor fornecido para o TELEFONE é inválido.',
        'invalid-photo-url': 'Erro: O valor fornecido para a propriedade de usuário FOTO é inválido. Deve ser URL.',
        'invalid-uid': 'Erro: Erro ao reconhecer usuário pela sua ID.',
        'missing-uid': 'Erro:  Erro ao reconhecer usuário, falta sua ID.',
        'uid-alread-exists': 'Erro:  Erro ao reconhecer ID de usuário, pois a mesma já existe!',
        'email-already-exists': 'Erro: O e-mail fornecido já está em uso por outro usuário. Cada usuário precisa ter um e-mail exclusivo.',
        'user-not-found': 'Erro: Não há registro de usuário existente correspondente aos dados fornecidos.',
        'operation-not-allowed': 'Erro: Operação inválida.',
        'invalid-credential': 'Erro: As credenciais informadas estão inválidas!',
        'phone-number-already-exists': 'O TELEFONE fornecido já está em uso por um usuário existente.',
        'project-not-found': 'Erro: Nenhum projeto foi encontrado com a credencial usada para inicializar o APP.',
        'insufficient-permission': 'Erro: Permissões insuficientes para realizar tal operação.',
        'internal-error': 'Erro: O servidor encontrou um erro inesperado ao tentar processar a solicitação.',
        'user-disabled': 'Erro: X.',
        'account-exists-with-different-credential': 'Erro: Esta conta já existe com credenciais diferentes.',
        'auth-domain-config-required': 'Erro: Domínio não configurado para usar autenticação.',
        'cancelled-popup-request': 'Erro: A requisição feita pela janela pop-up foi cancelada por algum motivo.',
        'operation-not-supported-in-this-environment': 'Erro: Operação não suportada para este ambiente.',
        'popup-blocked': 'Erro: A janela pop-up foi bloqueada. Certifique-se de habilitar para este site.',
        'popup-closed-by-user': 'Erro: A janela pop-up foi fechada pelo usuário antes de realizar a operação.',
        'unauthorized-domain': 'Erro: Domínio não autorizado.',
        'expired-action-code': 'Erro: O código foi expirado.',
        'invalid-action-code': 'Erro: O código está inválido.',
        'weak-password': 'Erro: Senha muito fraca.',
        'email-already-in-use': 'Erro: Este email já está sendo usado por outra conta.',
        'invalid-verification-code': 'Erro: O código de verificação está inválido.',
        'invalid-verification-id': 'Erro: O ID de verificação está inválido.',
        'app-deleted': 'Erro: O aplicativo foi deletado.',
        'app-not-authorized': 'Erro: O aplicativo não está autorizado.',
        'argument-error': 'Erro: Erro interno (argument-error). Tente novamente!',
        'invalid-api-key': 'Erro: Erro interno (invalid-api-key). Tente novamente!.',
        'invalid-user-token': 'Erro: O token único de usuário está inválido.',
        'network-request-failed': 'Erro: A conexão falhou.',
        'requires-recent-login': 'Erro: Requer um login recente.',
        'too-many-requests': 'Erro: Muitas requisições de uma só vez. Tente mais tarde.',
        'user-token-expired': 'Erro: O Token do usuário expirou.',
        'web-storage-unsupported': 'Erro: O armazenamento web não é suportado.',
        'wrong-password': 'Erro: Senha incorreta!'
    } as MessagesIndex;

    // https://firebase.google.com/docs/auth/admin/errors?hl=pt-br

    public printErrorByCode(code: string): string {
        console.log(code);
        code = code.split('/')[1];
        if (this.params[code]) {
            console.log(this.params[code]);
            return (this.params[code]);
        } else {
            return ('Ocorreu algum erro desconhecido! \n Codigo erro: ' + code);
        }
    }
}
