FROM centos/s2i-base-centos7:latest


ENV NPM_RUN=start \
    NODE_VERSION=8.11.4 \
    NPM_CONFIG_LOGLEVEL=info \
    NPM_CONFIG_PREFIX=$HOME/.npm-global \
    PATH=$HOME/node_modules/.bin/:$HOME/.npm-global/bin/:$PATH \
    NPM_VERSION=6.4.0 \
    DEBUG_PORT=5858 \
    NODE_ENV=development \
    DEV_MODE=false \
    TZ=Asia/Seoul \
    LANG=en_US.UTF-8


COPY epel.repo /etc/yum.repos.d/



# Drop the root user and make the content of /opt/app-root owned by user 1001
RUN curl -sL https://rpm.nodesource.com/setup_8.x | bash - && \
    yum install nss_wrapper telnet net-tools gcc gcc-c++ make libtool nodejs pkg-config libsodium libuuid-devel  -y && \
    yum clean all -y && \
    chown -R 1001:0 /opt/app-root && chmod -R ug+rwx /opt/app-root


## Install zeromq
WORKDIR /opt/
RUN curl -LOs https://archive.org/download/zeromq_4.1.4/zeromq-4.1.4.tar.gz && tar -xzf zeromq-4.1.4.tar.gz
WORKDIR /opt/zeromq-4.1.4
RUN ./autogen.sh
RUN ./configure
RUN make && make install
RUN echo /usr/local/lib > /etc/ld.so.conf.d/local.conf
RUN ldconfig
RUN cp ./src/libzmq.pc /usr/lib64/pkgconfig/

USER 1001

RUN mkdir -p /opt/app-root/src
WORKDIR /opt/app-root/src
COPY .npmrc .npmrc
COPY package.json package.json
RUN npm install
RUN rm -f .npmrc
COPY . .

EXPOSE 3000

CMD ["npm", "start"]
