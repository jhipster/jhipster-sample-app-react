package io.github.jhipster.sample.config;

import java.util.Collections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.testcontainers.containers.JdbcDatabaseContainer;
import org.testcontainers.containers.MySQLContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;

public class MysqlTestContainer implements SqlTestContainer {

    private static final Logger log = LoggerFactory.getLogger(MysqlTestContainer.class);
    private long memoryInBytes = 100 * 1024 * 1024;
    private long memorySwapInBytes = 200 * 1024 * 1024;

    private MySQLContainer<?> mysqlContainer;

    @Override
    public void destroy() {
        if (null != mysqlContainer && mysqlContainer.isRunning()) {
            mysqlContainer.stop();
        }
    }

    @Override
    public void afterPropertiesSet() {
        if (null == mysqlContainer) {
            mysqlContainer =
                new MySQLContainer<>("mysql:8.0.29-debian")
                    .withDatabaseName("jhipsterSampleApplicationReact")
                    .withTmpFs(Collections.singletonMap("/testtmpfs", "rw"))
                    .withLogConsumer(new Slf4jLogConsumer(log))
                    .withReuse(true)
                    .withPrivilegedMode(true)
                    .withConfigurationOverride("testcontainers/mysql")
                    .withCreateContainerCmdModifier(cmd -> cmd.getHostConfig().withMemory(memoryInBytes).withMemorySwap(memorySwapInBytes));
        }
        if (!mysqlContainer.isRunning()) {
            mysqlContainer.start();
        }
    }

    @Override
    public JdbcDatabaseContainer<?> getTestContainer() {
        return mysqlContainer;
    }
}
