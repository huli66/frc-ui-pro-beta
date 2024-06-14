import {Button, Modal} from '../../../../index';
import {useEffect, useState} from 'react';

interface IRulesProps {
  visible: boolean;
  setVisible: (bool: boolean) => void;
}

const Rules = ({visible, setVisible}: IRulesProps) => {
  const [timeState, setTimeState] = useState(3);

  useEffect(() => {
    if (visible === true) {
      setTimeState(3);
    }
  }, [visible]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeState > 0) {
      timer = setTimeout(() => {
        setTimeState((old) => old - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timeState]);

  return (
    <Modal
      title='聊天室使用协议'
      visible={visible}
      onCancel={() => setVisible(false)}
      width={560}
      footer={[
        <Button disabled={timeState !== 0} onClick={() => setVisible(false)} style={{width: 240}}>
          {timeState !== 0 ? `我已阅读并知晓 (${timeState})` : '我已阅读并知晓'}
        </Button>
      ]}
    >
      <div className='rules-body'>
        <p>尊敬的qeubee用户：</p>
        <p />
        <p>欢迎您使用森浦qeubee软件及票据聊天室服务！</p>
        <p>
          1、请您务必审慎阅读、充分理解各条款内容，除非您已阅读并接受本协议所有条款，否则您无权使用该聊天室提供的相关服务。您的使用、发言等行为即视为您已阅读并同意下述协议的内容。
        </p>
        <p>
          <section>a）记录和保存聊天室内发布的所有信息和内容</section>
          <section>
            您理解并同意森浦作为平台方，有权依照相关法律、法规规定的方式，记录和存储所有的聊天记录。即使您不再使用票据聊天室服务或票据聊天室不再提供服务。
          </section>
        </p>
        <p>
          <section>b）整合聊天室发布的信息并公开展示</section>
          <section>
            森浦有权在其自有的qeubee平台软件内，将聊天室发布内容或您所提供的信息进行整理、归纳并展示。森浦应明确标示信息来源于您所在机构，匿名发言情况除外。
          </section>
        </p>
        <p>
          <section>
            若您不同意森浦将您提供的信息予以公开展示，请即时停止使用聊天室服务，对于已发布的信息可联系400-119-9898删除。
          </section>
        </p>
        <p>
          <section>c）个人信息处理</section>
          <section>有关森浦如何处理您的个人信息，请参阅《隐私政策》，详见【设置】-【关于我们】-【隐私政策】</section>
        </p>
        <p>
          2、您理解并认可聊天室内信息仅供参考，不构成我司任何的投资建议。您应自行判断使用本聊天室内的信息和内容。我司不保证本聊天室发布的任何信息、言论等所有内容的完整性、准确性和及时性，任何通过本聊天室获取的信息以及因上述信息造成的任何损害，我司概不负责，您应对您在本聊天室内以任何形式发布的所有内容承担责任。您在本聊天室内发布的内容仅代表您的观点，与我司观点及立场无关。
        </p>
        <p>
          3、您使用本聊天室时应遵守法律以及行业规定的相关规则，请勿发表任何违反国家法律法规、公序良俗以及可能侵犯他人合法权益的内容，并保证您发表的内容不会侵犯第三方的合法权益。如因您发布的言论侵犯第三方的合法权益，由此造成的后果由您承担全部责任。
        </p>
        <p>
          4、本聊天室为票据同业交流提供服务，请勿发布任何与票据资讯无关的内容，亦或者未经我司允许，利用本聊天室开展任何商业性活动。
        </p>
        <p>
          5、任何用户在聊天室内从事违反上述规则的活动，或者其他可能违反法律法规、公序良俗或者侵犯他人合法权益的行为，一经发现，我司有权删除您的发言信息并关闭您的聊天室功能。如果您发现聊天室内有任何用户从事违反上述规则的活动，或者其他可能违反法律法规、公序良俗或者侵犯您或他人合法权益的行为，或者有任何其他问题亦可联系我司反馈。
        </p>
        <p>6、我司可能会根据国家法律法规变化及业务需要，不时修改、补充本协议，请您保持关注。</p>
      </div>
    </Modal>
  );
};

export default Rules;
